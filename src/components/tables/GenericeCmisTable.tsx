import * as React from "react"
import { useTableState, useFilters, Cell, TableProps, HeaderColumn } from "react-table";
import { useState, useRef, useEffect } from "react";
import MyTable from "./Table";
import JsonTree from "react-json-tree";
import { CmisQueryService } from "../cmis/CmisQueryService";
import { Button } from "react-bootstrap";
import { Input } from "./Styles";
import { CmisStatementBuilder } from '../cmis/CmisStatementBuilder'

interface Props {
    columns:any
    statement: string
    state: any
}

export function GenericCmisTable(props: Props) {

    console.log("In WordTable with query: " + props.statement);
    console.log("In WordTable with state: " + JSON.stringify(props.state[0]));

    const infinite = false;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const currentRequestRef = useRef<number>(null);
    const [{ sortBy, filters, pageIndex, pageSize }, setState] = props.state
 
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
        console.log("STATE IN FETCH: " + JSON.stringify(props.state[0]));

        setLoading(false);
    };

    // When sorting, filters, pageSize, or pageIndex change, fetch new data
    useEffect(
        () => {
            console.log("Rerendering with statement: " + props.statement)
            fetchData();
        },
        [props.statement, sortBy, filters, pageIndex, pageSize]
    );


    const handleCellClick = (cell:Cell, data) => {
        console.log("CLICKED..." + cell)
        let index = cell.row.index
        console.log("ROW: " + JSON.stringify(cell.row.index))
        console.log("DATA: " + JSON.stringify(data[index].succinctProperties['cmis:objectId']))
    }

    const instance = {
        infinite: infinite,
        loading: loading,
        onCellClick: handleCellClick,
        tableProps: {
            ...{
                data,
                columns:props.columns,
                state:props.state, // Pass the state to the table
                manualSorting: true, // Manual sorting
                manualFilters: true, // Manual filters
                manualPagination: true, // Manual pagination
                disableMultiSort: true, // Disable multi-sort
                disableGrouping: true, // Disable grouping
                debug: false
            }
        }
    }

    // console.log("instance.tableProps: " + JSON.stringify(instance.tableProps))
    // const filter = useFilters(instance.tableProps)

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