import * as React from "react"
import { useState, useEffect } from "react"
import { Form, FormGroup, Col, FormLabel, FormControl, Button, Row, Alert } from 'react-bootstrap'
import { cmis } from "../../lib/cmis"
import { CmisSessionWrapper } from "../cmis/CmisSessionWrapper";
import '../css/generic.css';
import { CmisPropertyDefinition } from "../cmis/model/CmisSpecModel";
import { CmisLingoService } from "../cmis/CmisLingoService";
import { GenericCmisQueryTable } from "../tables/generic/GenericCmisQueryTable";
import { CmisQueryService } from "../cmis/CmisQueryService";
import { Input } from "../tables/generic/Styles";

interface Props {
    sourceId: string
    setShow: any
}


export function LinkSemanticForm(props: Props) {


    const [semanticId, setSemanticId] = useState()
    const [errMsg, setErrMsg] = useState()
    const [filters, setFilters] = useState({})

    const statement: string =
        "SELECT S.lingo:semantic FROM lingo:document AS T " +
        "JOIN lingo:semantic AS S ON T.cmis:objectId = S.cmis:objectId " +
        "WHERE ANY cmis:secondaryObjectTypeIds IN ('P:lingo:semantic') " +
        "ORDER BY S.lingo:semantic"

    const columns = [
        {
            Header: "Semantic",
            id: "S.lingo:semantic",
            accessor: w => w.succinctProperties['lingo:semantic'],
            minWidth: 200,
            maxWidth: 250,
            Filter: (header) => {
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
        }
    ];

    const handleRowSelect = (row) => {
        let index = row.index
        let coid = row.original.succinctProperties["cmis:objectId"]
        setSemanticId(coid)
    }

    function handleSubmit(e) {
        e.preventDefault()

        // let session = CmisSessionWrapper.getInstance().getWrappedSession()
        // session.setErrorHandler((err) => {
        //     console.log("err.message: " + err.message)
        //     console.log("err.stack: " + err.stack)
        //     console.log("err.name: " + err.name)
        //     // setShowError(true)
        //     setErrMsg(err.stack)
        // })

        // CmisQueryService.getTableServerData()
        let cmisLingoService = new CmisLingoService(CmisSessionWrapper.getInstance())

        cmisLingoService.createRelationship(props.sourceId, semanticId, [CmisLingoService.SEMANTIC_MARKER]).then((res) => {
            console.log("In then createRelationship: " + JSON.stringify(res))
            setErrMsg(null)
            props.setShow(false)
        }).catch((err: cmis.HTTPError) => {
            setErrMsg(err.message)
        })
    }

    return (
        <div>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <FormGroup controlId="semantic">
                    <Row>
                        <Col>
                            <GenericCmisQueryTable statement={statement} filters={filters} onRowSelect={handleRowSelect} columns={columns} />
                        </Col>
                    </Row>
                </FormGroup>
                {errMsg ? (
                    <Alert key="semanticAlert" variant="danger">
                        {errMsg}
                    </Alert>
                ) : (<div />)}

                <div className="alignRight">
                    <Button type="submit">Save</Button>
                </div>
            </Form>
        </div>
    )
}