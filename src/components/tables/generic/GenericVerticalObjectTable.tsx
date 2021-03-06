import * as React from "react"
import { useState, useRef, useEffect } from "react";
import { useTableState, useFilters } from "react-table";
import MyTable from "./Table";
import { CmisSessionWrapper } from "../../cmis/CmisSessionWrapper";
import { FormControl, Button } from "react-bootstrap";
import { Input } from "./Styles";

interface Props {
    coid: string
}

export default function GenericVerticalObjectTable(props: Props) {

    const [data, setData] = useState([]);;
    const [loading, setLoading] = useState(false)
    const currentRequestRef = useRef<number>(null)
    const [isFilterSet, setFilterSet] = useState(false);
    const tableState = useTableState({ pageSize: 50 })

    const session = CmisSessionWrapper.getInstance().getWrappedSession();
    const saveData = async () => {
        let cmisProps = {}
        let changeTokenValue
        data.map(item => {
            if (item.key === 'cmis:changeToken') {
                changeTokenValue = item.value
            }
            if ((item.changed) && (item.value)) {
                cmisProps[item.key] = item.value
            }
        })

        console.log("ChangeToken: " + changeTokenValue)
        console.log("Saving cmisProps: " + JSON.stringify(cmisProps))
        let result = await session.updateProperties(props.coid, cmisProps, { changeToken: changeTokenValue, succinct: true })
        console.log("Result SAAAVED OBJECT: " + JSON.stringify(result))
    }

    const fetchData = async () => {
        setLoading(true);

        // We can use a ref to disregard any outdated requests
        const id = Date.now();
        currentRequestRef.current = id;

        // Call our server for the data
        let result = await session.getObject(props.coid)

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
                value: horizontalData[key],
                // changed indicates if the property was changed/touched in the form field
                changed: false
            });
        })

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
        console.log("In renderEditable")

        return (
            <FormControl value={displayData}
                onChange={(e: any) => {
                    let newValue = e.target.value
                    setData(old =>
                        old.map(item => {
                            if (item.key === cellDataKey) {
                                return {
                                    key: cellDataKey,
                                    value: newValue,
                                    changed: true
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
            setFilterSet(false)
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
                if (!isFilterSet) {
                    header.setFilter("lingo")
                    setFilterSet(true);
                }
                return (
                    <div>
                        <Input
                            placeholder='Search...'
                            value={header.filterValue || ""}
                            onChange={e => {
                                    setFilterSet(true)
                                header.setFilter(e.target.value)
                            }
                            }
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
            <Button onClick={saveData}>Save</Button>
            {/* <br />
            <br />
            <JsonTree data={instance} /> */}
        </div>
    )
}