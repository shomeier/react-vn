import * as React from "react"
import { GenericCmisTable } from "./generic/GenericCmisTable";
import { useState } from "react";
import { useTableState } from "react-table";

interface Props {
    coid: string
}


export default function WritableRelationshipsTable(props: Props) {
    const statement = "SELECT cmis:name, cmis:objectTypeId, cmis:secondaryObjectTypeIds FROM cmis:relationship WHERE cmis:objectId = '" + props.coid + "' ORDER BY cmis:objectTypeId";

    // Make a new controllable table state instance
    const state = useTableState({ pageCount: 0 })

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
        }
    ];

    return (
        <div>
            <GenericCmisTable statement={statement} state={state} columns={columns} />
        </div>
    )
}