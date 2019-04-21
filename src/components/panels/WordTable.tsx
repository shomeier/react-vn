import * as React from "react"
import { useTableState } from "react-table";
import { useState, useRef, useEffect } from "react";
import Table from "../tables/Table";
import JsonTree from "react-json-tree";
import { CmisQueryService } from "../cmis/CmisQueryService";
import { Button } from "react-bootstrap";

interface Props {
    query: string
}

export function WordTable(props: Props) {

    console.log("In WordTable with query: " + props.query);
    const columns = [
        {
            Header: "Word",
            id: "word",
            accessor: w => w.succinctProperties['lingo:text'],
            minWidth: 140,
            maxWidth: 200
        },
        {
            Header: "Part of Speec",
            id: "partOfSpeech",
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
    const query = props.query
    const state = useTableState({ pageCount: 0 })
    const [{sortBy, filters, pageIndex, pageSize }, setState] = state

    const fetchData = async () => {
        setLoading(true);

        // We can use a ref to disregard any outdated requests
        const id = Date.now();
        currentRequestRef.current = id;

        // Call our server for the data
        const { rows, pageCount } = await CmisQueryService.getTableServerData(
            props.query,
            filters,
            sortBy,
            pageSize,
            pageIndex
        );

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
        console.log("STATE IN FETCH: " + JSON.stringify(state[0]));

        setLoading(false);
    };

    // When sorting, filters, pageSize, or pageIndex change, fetch new data
    useEffect(
        () => {
            console.log("Rerendering with statement: " + props.query)
            fetchData();
        },
        [props.query, sortBy, filters, pageIndex, pageSize]
    );

    const instance = {
        ...{
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
            debug: false
        }
    }
    return (
        <div>
            <Table
                {...instance}
            />
            {/* <br />
            <br />
            <JsonTree data={instance} /> */}
        </div>
    )
}