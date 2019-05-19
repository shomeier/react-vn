import * as React from "react"
import { useState, useRef, useEffect } from "react";
import { useTableState } from "react-table";
import MyTable from "./Table";
import { CmisSessionWrapper } from "../../cmis/CmisSessionWrapper";

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
        // let result = await session.getObjectRelationships(props.coid, false, 'source', null, {maxItems:250, skipCount:0, includeAllowableActions:true, filter:'*', succinct:true})
        console.log("Result Object: " + JSON.stringify(result))

        // If this is an outdated request, disregard the results
        if (currentRequestRef.current !== id) {
            return;
        }

        // turn the data vertically
        let verticalData: any[] = new Array();
        let horizontalData = result.succinctProperties
        Object.keys(horizontalData).forEach(function(key) {
            verticalData.push({
                key: key,
                value: horizontalData[key]
            });
          })

        console.log("verticalData: " + verticalData)
        // Set the data and pageCount
        setData(verticalData);
        // setState(old => ({
        //     ...old,
        //     pageCount
        // }));

        setLoading(false);
    };

    // When sorting, filters, pageSize, or pageIndex change, fetch new data
    useEffect(
        () => {
            console.log("Rerendering generic vertical object table")
            fetchData();
        },
        [props.coid]
    );

    const columns = [
        {
            Header: "Key",
            id: "key",
            accessor: w => w.key,
            minWidth: 200,
            maxWidth: 250,
            // Cell: (cell) => {
            //     let index = cell.row.index
            //     let cellData = cell.data[index].succinctProperties[cell.column.id]
            //     let cellCoid = cell.data[index].succinctProperties["cmis:objectId"]
            //     return (
            //         <span onClick={() => {
            //             console.log("Clicked Cell...")
            //             console.log("Index: " + index)
            //             console.log("Cell Data COID: " + cellCoid)
            //         }}>
            //             {cellData}
            //         </span>
            //     )
            // }
        },
        {
            Header: "Value",
            id: "value",
            accessor: w => w.value,
            minWidth: 100,
            maxWidth: 200
        }
    ]

    const instance = {
        infinite: true,
        loading: loading,
        tableProps: {
            ...{
                data:data,
                columns:columns,
                manualSorting: false, // Manual sorting
                manualFilters: false, // Manual filters
                manualPagination: false, // Manual pagination
                disableMultiSort: true, // Disable multi-sort
                disableGrouping: true, // Disable grouping
                debug: false
            }
        }
    }

    // console.log("instance.tableProps: " + JSON.stringify(instance.tableProps))
    // const filter = useFilters(instance.t ableProps)

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