import * as React from "react"
import { useTableState, useFilters, Cell, TableProps, HeaderColumn } from "react-table";
import { useState, useRef, useEffect } from "react";
import MyTable from "./Table";
import JsonTree from "react-json-tree";
import { CmisQueryService } from "../../cmis/CmisQueryService";
import { Button } from "react-bootstrap";
import { Input } from "./Styles";
import { CmisStatementBuilder } from '../../cmis/CmisStatementBuilder'

interface Props {
    columns:any
    statement: string
    filters?: any,
    onRowSelect?:any,
    refresh?:any
}

export function GenericCmisQueryTable(props: Props) {

    console.log("In generic cmis table with query: " + props.statement);
    console.log("In generic cmis table with filter: " + JSON.stringify(props.filters));

    const infinite = false;
    const [data, setData] = useState([]);;
    const [loading, setLoading] = useState(false);
    const currentRequestRef = useRef<number>(null);
    // Make a new controllable table state instance
    const state = useTableState({ filters: props.filters ,pageCount: 0 })
    const [{ sortBy, filters, pageIndex, pageSize }, setState] = state
    console.log("STATEEEE: " + JSON.stringify(state[0]))
 
    const fetchData = async () => {
        setLoading(true);

        // We can use a ref to disregard any outdated requests
        const id = Date.now();
        currentRequestRef.current = id;

        // Call our server for the data
        const { rows, pageCount } = await CmisQueryService.getTableServerData(
            props.statement,
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

        setLoading(false);
    };

    // When sorting, filters, pageSize, or pageIndex change, fetch new data
    useEffect(
        () => {
            console.log("Rerendering generic cmis table with statement: " + props.statement)
            fetchData();
        },
        [props.statement, sortBy, filters, pageIndex, pageSize, props.refresh]
    );


    const instance = {
        infinite: infinite,
        loading: loading,
        onRowSelect: props.onRowSelect,
        tableProps: {
            ...{
                data,
                columns:props.columns,
                state:state, // Pass the state to the table
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