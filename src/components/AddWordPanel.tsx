import * as React from 'react';
// import { cmis } from 'cmis';
import { cmis } from '../lib/cmis';
import './css/AddWordPanel.css';
import { Button, Col, ControlLabel, Form, FormGroup, FormControl, HelpBlock } from 'react-bootstrap';
import PartOfSpeechForm from './PartOfSpeechForm';

interface Props {
    cmisSession: cmis.CmisSession,
};

export const AddWordPanel: React.StatelessComponent<Props> = (props) => {

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
                        <PartOfSpeechForm cmisSession={cmisSession}/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="WordVietnamese">
                    <Col sm={7}>
                        <ControlLabel>Vietnamese word</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter vietnamese word" />
                    </Col>
                </FormGroup>
            </Form>
        </div>
    );
}

export default AddWordPanel;