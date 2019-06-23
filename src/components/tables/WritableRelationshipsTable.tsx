import * as React from "react"
import { useState, useRef, useEffect } from "react";
import { useTableState } from "react-table";
import MyTable from "./generic/Table";
import { CmisSessionWrapper } from "../cmis/CmisSessionWrapper";
import { splitBsPropsAndOmit } from "react-bootstrap/lib/utils/bootstrapUtils";
import { ButtonGroup, Button, DropdownButton, Dropdown } from "react-bootstrap";
import { ModalWrapper } from "../ModalWrapper";
import { AddSemanticForm } from "../forms/AddSemanticForm";

interface Props {
    sourceId: string
    onRowSelect?: any
}


export default function WritableRelationshipsTable(props: Props) {
    const ADD_SEMANTIC = "add_semantic"
    const infinite = false;
    const [data, setData] = useState([]);;
    const [loading, setLoading] = useState(false);
    const showAddSemanticFormState = useState(false)
    const [showAddSemanticForm, setShowAddSemanticForm] = showAddSemanticFormState
    const currentRequestRef = useRef<number>(null);
    // const [{ sortBy, filters, pageIndex, pageSize }, setState] = useTableState({pageCount: 0 })

    const fetchData = async () => {
        setLoading(true);

        // We can use a ref to disregard any outdated requests
        const id = Date.now();
        currentRequestRef.current = id;

        // Call our server for the data
        let session = CmisSessionWrapper.getInstance().getWrappedSession();
        let result = await session.getObjectRelationships(props.sourceId, false, 'source', null, { maxItems: 250, skipCount: 0, includeAllowableActions: true, filter: '*', succinct: true })
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

    useEffect(
        () => {
            console.log("Rerendering relationships table with id: " + props.sourceId)
            fetchData();
        },
        [props.sourceId]
    );

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
        onRowSelect: props.onRowSelect,
        loading: loading,
        tableProps: {
            ...{
                data,
                columns: columns,
                disableGrouping: true, // Disable grouping
                debug: false
            }
        }
    }

    return (
        <div>
            <ModalWrapper showState={showAddSemanticFormState} title="Add a new semantic">
                <AddSemanticForm sourceId={props.sourceId} setShow={setShowAddSemanticForm}/>
                {/* <AddWordForm setPartOfSpeech={setPartOfSpeech} setWord={setWord} onSubmit={handleSubmit} /> */}
            </ModalWrapper>
            <MyTable {...instance}
            />
            <ButtonGroup>
                <DropdownButton as={ButtonGroup} title="Add ..." id="bg-nested-dropdown">
                    <Dropdown.Item onSelect={(e) => { if (e === ADD_SEMANTIC) setShowAddSemanticForm(true)}} eventKey={ADD_SEMANTIC}>Semantic</Dropdown.Item>
                <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
                </DropdownButton>
            </ButtonGroup>
            {/* <br />
            <br />
            <JsonTree data={instance} /> */}
        </div >
    )
}