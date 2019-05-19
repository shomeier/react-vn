import * as React from "react"
import { useState, useEffect } from "react"
import { Form, FormGroup, Col, FormLabel, FormControl, Button, Row } from 'react-bootstrap'
import { CmisFormControl } from "../cmis/CmisFormControl"
import { CmisSessionWrapper } from "../cmis/CmisSessionWrapper";
import '../css/generic.css';
import { CmisPropertyDefinition } from "../cmis/model/CmisSpecModel";
import { CmisLingoService } from "../cmis/CmisLingoService";

interface Props {
    setPartOfSpeech:any
    setWord:any
    onSubmit:any
}

function handleSubmit(e, onSubmit) {
    e.preventDefault()
    onSubmit()
    // console.log("partOfSpeech: " + partOfSpeech)
    // let cmisLingoService = new CmisLingoService(CmisSessionWrapper.getInstance())
    // cmisLingoService.saveWord({partOfSpeech:partOfSpeech, word:word, language: language})
    //     .then(res => {if((res === true) && (onSuccess))onSuccess()})
}

export function AddWordForm(props:Props) {

    const [partOfSpeechPropDef, setPartOfSpeechPropDef] = useState()
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        let cmisSession = CmisSessionWrapper.getInstance().getWrappedSession();
        cmisSession.getTypeDefinition('P:lingo:part_of_speech').then((res) => {
            const propDef:CmisPropertyDefinition = res.propertyDefinitions['lingo:part_of_speech']
            console.log("propDef: " + JSON.stringify(propDef))
            setPartOfSpeechPropDef(propDef)
            // set default value
            props.setPartOfSpeech(propDef.defaultValue)
            setIsReady(true)
        });
    }, [isReady])

    return (
        <div>
            {isReady ? (
            <Form onSubmit={(e) => handleSubmit(e, props.onSubmit)}>
            {/* <Form onSubmit={(e) => handleSubmit(e, partOfSpeech, word, "vn", props.onClose)}> */}
                    <FormGroup controlId="word">
                        <Row>
                            <Col sm={5}>
                                <FormLabel>Part Of Speech</FormLabel>
                                <CmisFormControl
                                    propertyDefinition={partOfSpeechPropDef}
                                    componentClass='select'
                                    onChange={(e) => {console.log("Setting partOfSpeech: " + (e.target).value); props.setPartOfSpeech((e.target as HTMLInputElement).value)}}
                                    item='sourceVocab.partOfSpeech' />
                            </Col>
                            <Col sm={7}>
                                <FormLabel>Word</FormLabel>
                                <FormControl onChange={(e) => props.setWord((e.target as HTMLInputElement).value)} />
                            </Col>
                        </Row>
                    </FormGroup>

                    <div className="alignRight">
                        <Button type="submit">Submit</Button>
                    </div>
                </Form>
            )
                :
                <div>Loading ...</div>
            }
        </div>
    )
}