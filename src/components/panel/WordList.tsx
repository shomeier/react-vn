import * as React from "react"
import { useTableState } from "react-table";
import { useState, useRef, useEffect } from "react";
import Table from "../table/Table";
import { CmisSessionWrapper } from "../cmis/CmisSessionWrapper";

const getServerData = async ({ filters, sortBy, pageSize, pageIndex }) => {

    console.log("F´filters: " + filters)
    console.log("sortBy: " + sortBy)
    console.log("pageSize: " + pageSize)
    console.log("pageIndex: " + pageIndex)

    let cmisSession = CmisSessionWrapper.getInstance().getWrappedSession()
    let result = await cmisSession.query("SELECT * from lingo:text", false, { includeRelationships: "both", includeAllowableActions: true, maxItems: pageSize, skipCount: (pageIndex * pageSize), orderBy: sortBy })
    console.log("Result: " + JSON.stringify(result));
    console.log("hasMoreItems: " + result.hasMoreItems);
    console.log("hasMoreItems: " + JSON.stringify(result.hasMoreItems));

    // Ideally, you would pass this info to the server, but we'll do it here for convenience
    // const filtersArr = Object.entries(filters);

    // Apply Filters
    // if (filtersArr.length) {
    //   rows = rows.filter(row =>
    //     filtersArr.every(([key, value]) => row[key].includes(value))
    //   );
    // }

    // Apply Sorting
    // if (sortBy.length) {
    //   const [{ id, desc }] = sortBy;
    //   rows = [...rows].sort(
    //     (a, b) => (a[id] > b[id] ? 1 : a[id] === b[id] ? 0 : -1) * (desc ? -1 : 1)
    //   );
    // }

    // Get page counts
    const pageCount = Math.ceil(result.numItems / pageSize);
    console.log("pageCount: " + pageCount)
    // const rowStart = pageSize * pageIndex;
    // const rowEnd = rowStart + pageSize;

    // Get the current page
    // rows = rows.slice(rowStart, rowEnd);

    let rows = result.results;
    console.log("rows: " + JSON.stringify(rows))
    return {
        rows,
        pageCount
    };
};

export default function () {

    const columns = [
        {
            Header: "Word",
            id: "word",
            accessor: w => w.succinctProperties['cmis:name'],
            minWidth: 140,
            maxWidth: 200
        }
    ];

    const infinite = false;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const currentRequestRef = useRef<number>(null);

    // Make a new controllable table state instance
    const state = useTableState({ pageCount: 0 });

    const [{ sortBy, filters, pageIndex, pageSize }, setState] = state;

    const fetchData = async () => {
        setLoading(true);

        // We can use a ref to disregard any outdated requests
        const id = Date.now();
        currentRequestRef.current = id;

        // Call our server for the data
        const { rows, pageCount } = await getServerData({
            filters,
            sortBy,
            pageSize,
            pageIndex
        });

        // If this is an outdated request, disregard the results
        if (currentRequestRef.current !== id) {
            return;
        }

        // Set the data and pageCount
        setData(rows);
        setState(old => ({
            ...old,
            pageCount
        }));

        setLoading(false);
    };

    // When sorting, filters, pageSize, or pageIndex change, fetch new data
    useEffect(
        () => {
            fetchData();
        },
        [sortBy, filters, pageIndex, pageSize]
    );

    return (
        <Table
            {...{
                data,
                columns,
                infinite,
                state, // Pass the state to the table
                loading,
                manualSorting: true, // Manual sorting
                manualFilters: true, // Manual filters
                manualPagination: true, // Manual pagination
                disableMultiSort: true, // Disable multi-sort
                disableGrouping: true, // Disable grouping
                debug: true
            }}
        />
    );
}