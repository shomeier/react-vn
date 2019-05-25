import * as React from "react"
import { useState, useRef, useEffect } from "react";
import { useTableState } from "react-table";
import MyTable from "./Table";
import { CmisSessionWrapper } from "../../cmis/CmisSessionWrapper";
import { FormControl } from "react-bootstrap";
import { Input } from "./Styles";

interface Props {
    coid: string
}

export default function GenericVerticalObjectTable(props: Props) {

    const [data, setData] = useState([]);;
    const [loading, setLoading] = useState(false);
    const currentRequestRef = useRef<number>(null);
    const tableState = useTableState({ pageSize: 50 })

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
        let cellData = cell.data[cell.row.index]
        // let cellData = data[cell.row.index];
        let cellDataKey = cellData.key
        let cellDataValue = cellData.value
        let displayData = (cellDataValue) ? cellDataValue.toString() : ""
        console.log("IN RENDER EDITABLE")

        return (
            <FormControl value={displayData}
                onChange={(e: any) => {
                    let newValue = e.target.value
                    console.log("Input: " + newValue)
                    setData(old =>
                        old.map(item => {
                            if (item.key === cellDataKey) {
                                return {
                                    key: cellDataKey,
                                    value: newValue
                                }
                            } else {
                                return item;
                            }
                        })
                    )
                }}
            />
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
            Filter: (header) => {
                if (header.filterValue !== "lingo")
                    header.setFilter("lingo")
                return (
                    <div>
                        <Input
                            placeholder='Search...'
                            value={header.filterValue || ""}
                            onChange={e => header.setFilter(e.target.value)}
                        />
                        {/* <JsonTree data={header}/> */}
                    </div>
                );
            }
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
        infinite: false,
        loading: loading,
        tableProps: {
            data: data,
            state: tableState,
            columns: columns,
            disableGrouping: true
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