import * as React from "react"
import { useState, useRef, useEffect } from "react";
import { useTableState } from "react-table";
import MyTable from "./generic/Table";
import { CmisSessionWrapper } from "../cmis/CmisSessionWrapper";

interface Props {
    coid: string
}


export default function WritableRelationshipsTable(props: Props) {
    const infinite = false;
    const [data, setData] = useState([]);;
    const [loading, setLoading] = useState(false);
    const currentRequestRef = useRef<number>(null);
    // const [{ sortBy, filters, pageIndex, pageSize }, setState] = useTableState({pageCount: 0 })
 
    const fetchData = async () => {
        setLoading(true);

        // We can use a ref to disregard any outdated requests
        const id = Date.now();
        currentRequestRef.current = id;

        // Call our server for the data
        let session = CmisSessionWrapper.getInstance().getWrappedSession();
        let result = await session.getObjectRelationships(props.coid, false, 'source', null, {maxItems:250, skipCount:0, includeAllowableActions:true, filter:'*', succinct:true})
        console.log("Result RELATIONSHIPS: " + JSON.stringify(result))

        // If this is an outdated request, disregard the results
        if (currentRequestRef.current !== id) {
            return;
        }

        // Set the data and pageCount
        setData(result.objects);
        // setState(old => ({
        //     ...old,
        //     pageCount
        // }));

        setLoading(false);
    };

    // When sorting, filters, pageSize, or pageIndex change, fetch new data
    useEffect(
        () => {
            console.log("Rerendering relationships table")
            fetchData();
        },
        [props.coid]
    );

    // Make a new controllable table state instance
    // const state = useTableState({ pageCount: 0 })

    const columns = [
        {
            Header: "Type",
            id: "cmis:objectTypeId",
            accessor: w => w.succinctProperties['cmis:objectTypeId'],
            minWidth: 400,
            maxWidth: 600,
            Cell: (cell) => {
                let index = cell.row.index
                let cellData = cell.data[index].succinctProperties[cell.column.id]
                let cellCoid = cell.data[index].succinctProperties["cmis:objectId"]
                return (
                    <span onClick={() => {
                        console.log("Clicked Cell...")
                        console.log("Index: " + index)
                        console.log("Cell Data COID: " + cellCoid)
                    }}>
                        {cellData}
                    </span>
                )
            }
        },
        {
            Header: "Name",
            id: "cmis:name",
            accessor: w => w.succinctProperties['cmis:name'],
            minWidth: 140,
            maxWidth: 200
        },
        {
            Header: "Markers",
            id: "cmis:cmis:secondaryObjectTypeIds",
            accessor: w => w.succinctProperties['cmis:secondaryObjectTypeIds'],
            minWidth: 140,
            maxWidth: 200
        }
    ]

    const instance = {
        infinite: infinite,
        loading: loading,
        tableProps: {
            ...{
                data,
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