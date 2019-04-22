import * as React from "react"
import { useTableState, useFilters, TableProps } from "react-table";
import { useState, useRef, useEffect } from "react";
import MyTable from "../tables/Table";
import JsonTree from "react-json-tree";
import { CmisQueryService } from "../cmis/CmisQueryService";
import { Button } from "react-bootstrap";
import { Input } from "../tables/Styles";
import { CmisStatementBuilder } from '../cmis/CmisStatementBuilder'

interface Props {
    query: string
    filter?: any
}

export function WordTable(props: Props) {

    console.log("In WordTable with query: " + props.query);
    console.log("In WordTable with filter: " + JSON.stringify(props.filter));

    const columns = [
        {
            Header: "Word",
            id: "word",
            accessor: w => w.succinctProperties['lingo:text'],
            minWidth: 140,
            maxWidth: 200,
            Filter: header => {
                return (
                    <Input
                        placeholder='Search...'
                        value={header.filterValue || ""}
                        onChange={e => header.setFilter(e.target.value)}
                    />
                );
            }
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
    const [{ sortBy, filters, pageIndex, pageSize }, setState] = state
    console.log("data: " + data)
    console.log("columns: " + columns)
    // const filter = useFilters({ data, columns })
    // setFilter("word", props.filter.word)

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
        infinite: infinite,
        loading: loading,
        tableProps: {
            ...{
                data,
                columns,
                state, // Pass the state to the table
                manualSorting: true, // Manual sorting
                manualFilters: true, // Manual filters
                manualPagination: true, // Manual pagination
                disableMultiSort: true, // Disable multi-sort
                disableGrouping: true, // Disable grouping
                debug: false
            }
        }
    }
    return (
        <div>
            <MyTable 
                {...instance}
            />
            {/* <br />
            <br />
            <JsonTree data={instance} /> */}
        </div>
    )
}