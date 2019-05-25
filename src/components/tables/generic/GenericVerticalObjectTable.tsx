import * as React from "react"
import { useState, useRef, useEffect } from "react";
import { useTableState } from "react-table";
import MyTable from "./Table";
import { CmisSessionWrapper } from "../../cmis/CmisSessionWrapper";
import { FormControl } from "react-bootstrap";

interface Props {
    coid: string
}

export default function GenericVerticalObjectTable(props: Props) {

    const [data, setData] = useState([]);;
    const [loading, setLoading] = useState(false);
    const currentRequestRef = useRef<number>(null);

    const fetchData = async () => {
        setLoading(true);

        // We can use a ref to disregard any outdated requests
        const id = Date.now();
        currentRequestRef.current = id;

        // Call our server for the data
        let session = CmisSessionWrapper.getInstance().getWrappedSession();
        let result = await session.getObject(props.coid)
        console.log("Result OBJECT: " + JSON.stringify(result))

        // If this is an outdated request, disregard the results
        if (currentRequestRef.current !== id) {
            return;
        }

        // turn the data vertically
        let verticalData: any[] = new Array();
        let horizontalData = result.succinctProperties
        Object.keys(horizontalData).forEach(function (key) {
            verticalData.push({
                key: key,
                value: horizontalData[key]
            });
        })

        console.log("verticalData: " + verticalData)
        // Set the data and pageCount
        setData(verticalData);

        setLoading(false);
    };


    const renderEditable = (cell) => {
        let cellProps = cell.getCellProps()
        let cellData = cell.data[cell.row.index]
        let cellDataKey = cellData.key
        let cellDataValue = cellData.value
        let displayData = (cellDataValue) ? cellDataValue.toString() : ""
        console.log("IN RENDER EDITABLE")
        const [data, setData] = useState(displayData)
        return (
            <FormControl value={data} onChange={(e: any) => {
                setData(e.target.value);
                console.log("Edited Form Control..." + e.target.value)
            }}/>
        );
    }

    useEffect(
        () => {
            console.log("Rerendering generic vertical object table for object with id: " + props.coid)
            fetchData();
        },
        [props.coid]
    );

    const columns = [
        {
            Header: "Key",
            id: "key",
            accessor: w => w.key,
            minWidth: 225,
            maxWidth: 250,
        },
        {
            Header: "Value",
            id: "value",
            accessor: w => w.value,
            minWidth: 225,
            maxWidth: 200,
            Cell: renderEditable
        }
    ]

    const instance = {
        infinite: true,
        loading: loading,
        tableProps: {
            ...{
                data: data,
                columns: columns,
                disableGrouping: true
            }
        }
    }

    return (
        <div>
            <MyTable {...instance}
            />
            {/* <br />
            <br />
            <JsonTree data={instance} /> */}
        </div>
    )
}