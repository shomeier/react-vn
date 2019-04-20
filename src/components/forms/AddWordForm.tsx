import * as React from "react"
import { useState, useEffect } from "react"
import { Form, FormGroup, Col, FormLabel, FormControl, Button } from 'react-bootstrap'
import { CmisFormControl } from "../cmis/CmisFormControl"
import { CmisSessionWrapper } from "../cmis/CmisSessionWrapper";
import '../css/generic.css';

export function AddWordForm() {

    const [partOfSpeech, setPartOfSpeech] = useState("noun")
    const [word, setWord] = useState()
    const [partOfSpeechPropDef, setPartOfSpeechPropDef] = useState()
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        let cmisSession = CmisSessionWrapper.getInstance().getWrappedSession();
        cmisSession.getTypeDefinition('P:lingo:part_of_speech').then((res) => {
            console.log("Trying to get partOfSpeech ...")
            setPartOfSpeechPropDef(res.propertyDefinitions['lingo:part_of_speech'])
            setIsReady(true)
        });
    })

    return (
        <div>
            {isReady ? (
                <Form>
                    <FormGroup controlId="word">

                        <Col sm={3}>
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

                    </FormGroup>

                    {/* <FormGroup controlId="semantic">
            <Col sm={10}>
                <FormLabel>Semantic</FormLabel>
                <FormControl
                    onChange={(e) => { this.handleChange('semantic', e) }} />
            </Col>
        </FormGroup>
        <FormGroup controlId="wordEn">
            <Col sm={10}>
                <FormLabel>English Word</FormLabel>
                <FormControl
                    onChange={(e) => { this.handleChange('targetVocab.word', e) }} />
            </Col>
        </FormGroup> */}

                    <Button className="alignRight" type="submit">Submit</Button>
                </Form>
            )
                :
                <div>Loading ...</div>
            }
        </div>
    )
}