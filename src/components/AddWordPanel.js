import React, { Component } from 'react';
import cmis from 'cmis';
// import { cmis } from '../lib/cmis';
import './css/AddWordPanel.css';
import { Button, Col, ControlLabel, Form, FormGroup, FormControl, HelpBlock } from 'react-bootstrap';

export function AddWordPanel(props) {

    const cmisSession = props.cmisSession;

    return (
        <div className="addWordPanel">
            <Form horizontal>
                <FormGroup controlId="WordEnglish">
                    <Col sm={7}>
                        <ControlLabel>English word</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter english word" />
                    </Col>
                    <Col sm={5}>
                        <ControlLabel>Part Of Speech</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter part of speech" />
                    </Col>
                </FormGroup>
            </Form>
        </div>
    );
}

export default AddWordPanel;