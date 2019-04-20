import * as React from "react"
import { useState, useEffect } from "react"
import { Form, FormGroup, Col, FormLabel, FormControl, Button, Row } from 'react-bootstrap'
import { CmisFormControl } from "../cmis/CmisFormControl"
import { CmisSessionWrapper } from "../cmis/CmisSessionWrapper";
import '../css/generic.css';
import { CmisPropertyDefinition } from "../cmis/model/CmisSpecModel";
import { CmisLingoService } from "../cmis/CmisLingoService";

function handleSubmit(e, partOfSpeech, word, language) {
    e.preventDefault()
    let cmisLingoService = new CmisLingoService(CmisSessionWrapper.getInstance())
    cmisLingoService.saveWord({partOfSpeech:partOfSpeech, word:word, language: "vn"})
}

export function AddWordForm() {

    const [partOfSpeech, setPartOfSpeech] = useState()
    const [word, setWord] = useState()
    const [partOfSpeechPropDef, setPartOfSpeechPropDef] = useState()
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        let cmisSession = CmisSessionWrapper.getInstance().getWrappedSession();
        cmisSession.getTypeDefinition('P:lingo:part_of_speech').then((res) => {
            const propDef:CmisPropertyDefinition = res.propertyDefinitions['lingo:part_of_speech']
            setPartOfSpeechPropDef(propDef)
            // set default value
            setPartOfSpeech(propDef.defaultValue)
            setIsReady(true)
        });
    }, [isReady])

    let cmisLingoService = new CmisLingoService(CmisSessionWrapper.getInstance())

    return (
        <div>
            {isReady ? (
                <Form onSubmit={(e) => handleSubmit(e, partOfSpeech, word, "vn")}>
                    <FormGroup controlId="word">
                        <Row>
                            <Col sm={5}>
                                <FormLabel>Part Of Speech</FormLabel>
                                <CmisFormControl
                                    propertyDefinition={partOfSpeechPropDef}
                                    componentClass='select'
                                    onChange={e => setPartOfSpeech((e.target as HTMLInputElement).value)}
                                    item='sourceVocab.partOfSpeech' />
                            </Col>
                            <Col sm={7}>
                                <FormLabel>Word</FormLabel>
                                <FormControl onChange={(e) => setWord((e.target as HTMLInputElement).value)} />
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