import * as React from "react"
import { useState, useRef, useEffect } from "react";
import { useTableState } from "react-table";
import MyTable from "./generic/Table";
import { CmisSessionWrapper } from "../cmis/CmisSessionWrapper";
import { splitBsPropsAndOmit } from "react-bootstrap/lib/utils/bootstrapUtils";
import { ButtonGroup, Button, DropdownButton, Dropdown } from "react-bootstrap";
import { ModalWrapper } from "../ModalWrapper";
import { AddSemanticForm } from "../forms/AddSemanticForm";
import { LinkSemanticForm } from "../forms/LinkSemanticForm";
import { AddExampleForm } from "../forms/AddExampleForm";
import { CmisLingoService } from "../cmis/CmisLingoService";

interface Props {
    sourceId: string
    selectedRelationship?: any
    setSelectedRelationship?: any
}


export default function WritableRelationshipsTable(props: Props) {
    const ADD_SEMANTIC = "add_semantic"
    const ADD_EXAMPLE = "add_example"
    const LINK_SEMANTIC = "link_semantic"
    const infinite = false;
    const [data, setData] = useState([]);;
    const [refresh, setRefresh] = useState(false)
    const [loading, setLoading] = useState(false)
    const showAddSemanticFormState = useState(false)
    const showAddExampleFormState = useState(false)
    const showLinkSemanticFormState = useState(false)
    const [showAddSemanticForm, setShowAddSemanticForm] = showAddSemanticFormState
    const [showAddExampleForm, setShowAddExampleForm] = showAddExampleFormState
    const [showLinkSemanticForm, setShowLinkSemanticForm] = showLinkSemanticFormState
    const currentRequestRef = useRef<number>(null)
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
        [props.sourceId, refresh]
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

    const handleRowSelect = (row) => {
        const cmisRelationship = row.original
        props.setSelectedRelationship(cmisRelationship)
    }

    const handleDeleteButtonClick = () => {
        let cmisSession = CmisSessionWrapper.getInstance().getWrappedSession()
        cmisSession.deleteObject(props.selectedRelationship.succinctProperties["cmis:objectId"]).then((res) => {
            setRefresh(old => !old )
        })
    }

    const instance = {
        infinite: infinite,
        onRowSelect: handleRowSelect,
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
                <AddSemanticForm sourceId={props.sourceId} setShow={(show) => {setRefresh(old => !old ); setShowAddSemanticForm(show)}}/>
            </ModalWrapper>
            <ModalWrapper showState={showAddExampleFormState} title="Add a new example">
                <AddExampleForm sourceId={props.sourceId} setShow={(show) => {setRefresh(old => !old ); setShowAddExampleForm(show)}}/>
            </ModalWrapper>
            <ModalWrapper showState={showLinkSemanticFormState} title="Link an existing semantic">
                <LinkSemanticForm sourceId={props.sourceId} setShow={(show) => {setRefresh(old => !old ); setShowLinkSemanticForm(show)}}/>
            </ModalWrapper>
            <MyTable {...instance}
            />
            <ButtonGroup>
                <DropdownButton as={ButtonGroup} title="Add new ..." id="bg-nested-dropdown">
                    <Dropdown.Item onSelect={(e) => { if (e === ADD_SEMANTIC) setShowAddSemanticForm(true)}} eventKey={ADD_SEMANTIC}>Semantic</Dropdown.Item>
                    <Dropdown.Item onSelect={(e) => { if (e === ADD_EXAMPLE) setShowAddExampleForm(true)}} eventKey={ADD_EXAMPLE}>Example</Dropdown.Item>
                </DropdownButton>
                <DropdownButton as={ButtonGroup} title="Link existing ..." id="bg-nested-dropdown">
                    <Dropdown.Item onSelect={(e) => { if (e === LINK_SEMANTIC) setShowLinkSemanticForm(true)}} eventKey={LINK_SEMANTIC}>Semantic</Dropdown.Item>
                </DropdownButton>
                <Button onClick={handleDeleteButtonClick}>Delete</Button>
            </ButtonGroup>
            {/* <br />
            <br />
            <JsonTree data={instance} /> */}
        </div >
    )
}