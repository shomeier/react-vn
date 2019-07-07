import * as React from "react"
import { useState, useEffect } from "react"
import { Form, FormGroup, Col, FormLabel, FormControl, Button, Row, Alert } from 'react-bootstrap'
import { cmis } from "../../lib/cmis"
import { CmisSessionWrapper } from "../cmis/CmisSessionWrapper";
import '../css/generic.css';
import { CmisPropertyDefinition } from "../cmis/model/CmisSpecModel";
import { CmisLingoService } from "../cmis/CmisLingoService";
import { inspect, isNullOrUndefined } from 'util' // or directly

interface Props {
    sourceId?: string
    setShow: any
}


export function AddExampleForm(props: Props) {

    const [example, setExample] = useState()
    const [semanticId, setSemanticId] = useState()
    const [errMsg, setErrMsg] = useState()
    const [semantics, setSemantics] = useState([])
    

    const fetchData = async () => {
        let cmisLingoService = new CmisLingoService(CmisSessionWrapper.getInstance())
        let semantics = await cmisLingoService.getSemantics(props.sourceId);
        console.log("Seeemantics: " + JSON.stringify(semantics));
        setSemantics(semantics)

        // per default the first semantic in array is used
        if (semantics) {
            setSemanticId(semantics[0].succinctProperties["cmis:objectId"])
        }
    }

    useEffect(
        () => {
            fetchData();
        },
        [props.sourceId]
    );

    function handleSubmit(e) {
        e.preventDefault()

        let session = CmisSessionWrapper.getInstance().getWrappedSession()
        // session.setErrorHandler((err) => {
        //     console.log("err.message: " + err.message)
        //     console.log("err.stack: " + err.stack)
        //     console.log("err.name: " + err.name)
        //     // setShowError(true)
        //     setErrMsg(err.stack)
        // })
        let cmisLingoService = new CmisLingoService(CmisSessionWrapper.getInstance())
        cmisLingoService.saveExample(example).then((res) => {
            console.log("In then saveExample: " + JSON.stringify(res))
            if (props.sourceId) {
                let targetId = res.succinctProperties['cmis:objectId']
                cmisLingoService.createRelationship(props.sourceId, targetId, [CmisLingoService.EXAMPLE_MARKER]).then((res) => {
                    console.log("Creating second relationship, sourceId: " + semanticId)
                    cmisLingoService.createRelationship(semanticId, targetId, [CmisLingoService.EXAMPLE_MARKER]).then((res) => {
                        setErrMsg(null)
                        props.setShow(false)
                    }).catch((err:cmis.HTTPError) => {
                        setErrMsg(err.message)
                    })
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
                <FormGroup controlId="text">
                    <Row>
                        <Col>
                            <FormLabel>Example</FormLabel>
                            <Form.Control onChange={(e: any) => setExample((e.target as HTMLInputElement).value)} as="textarea" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormLabel>Semantic</FormLabel>
                            <Form.Control onChange={(e: any) => {
                                setSemanticId((e.target as HTMLInputElement).value)
                                console.log("Set semantic id: " + semanticId)
                                }} as="select">
                            {semantics.map((semantic) =>
                                <option value={semantic.succinctProperties["cmis:objectId"]} key={semantic.succinctProperties["cmis:objectId"]}>
                                    {semantic.succinctProperties["lingo:semantic"]}
                                </option>)
                            }
                            </Form.Control>
                        </Col>
                    </Row>
                </FormGroup>
                {errMsg ? (
                    <Alert key="alert" variant="danger">
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