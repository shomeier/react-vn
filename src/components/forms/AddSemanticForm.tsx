import * as React from "react"
import { useState, useEffect } from "react"
import { Form, FormGroup, Col, FormLabel, FormControl, Button, Row, Alert } from 'react-bootstrap'
import { cmis } from "../../lib/cmis"
import { CmisSessionWrapper } from "../cmis/CmisSessionWrapper";
import '../css/generic.css';
import { CmisPropertyDefinition } from "../cmis/model/CmisSpecModel";
import { CmisLingoService } from "../cmis/CmisLingoService";

interface Props {
    sourceId?: string
    setShow: any
}


export function AddSemanticForm(props: Props) {

    const [semantic, setSemantic] = useState()
    const [errMsg, setErrMsg] = useState()

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
        let cmisLingoService = new CmisLingoService(CmisSessionWrapper.getInstance())
        cmisLingoService.saveSemantic(semantic).then((res) => {
            console.log("In then saveSemantic: " + JSON.stringify(res))
            if (props.sourceId) {
                let targetId = res.succinctProperties['cmis:objectId']
                cmisLingoService.createRelationship(props.sourceId, targetId, [CmisLingoService.SEMANTIC_MARKER]).then((res) => {
                    console.log("In then createRelationship: " + JSON.stringify(res))
                    setErrMsg(null)
                    props.setShow(false)
                }).catch((err:cmis.HTTPError) => {
                    setErrMsg(err.message)
                })
            } else {
                setErrMsg(null)
                props.setShow(false)
            }
        }).catch((err:cmis.HTTPError) => {
            console.log("err.name: " + err.name)
            console.log("err.response: " + JSON.stringify(err.response))
            console.log("err.message: " + err.message)
            console.log("err.stack: " + err.stack)
            setErrMsg(err.message)
        })
    }

    return (
        <div>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <FormGroup controlId="semantic">
                    <Row>
                        <Col>
                            <FormLabel>Semantic</FormLabel>
                            <Form.Control onChange={(e: any) => setSemantic((e.target as HTMLInputElement).value)} as="textarea" />
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