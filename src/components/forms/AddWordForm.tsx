import * as React from "react"
import { useState } from "react"
import { Form, FormGroup, Col, FormLabel, FormControl, Button } from 'react-bootstrap'
import { CmisFormControl } from "../cmis/CmisFormControl"

export function AddWordForm() {

    const [partOfSpeech, setPartOfSpeech] = useState("noun")
    const [word, setWord] = useState()

    return (
        <Form>
            <FormGroup controlId="word">

                <Col sm={3}>
                    <CmisFormControl
                        propertyDefinition={this.state.partOfSpeechPropDef}
                        componentClass='select'
                        onChange={e => setPartOfSpeech(e.target.value)}
                        item='sourceVocab.partOfSpeech' />
                </Col>


                <Col sm={7}>
                    <FormLabel>Word</FormLabel>
                    <FormControl onChange={(e) => setWord(e.target.value)} />
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

            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    )
}