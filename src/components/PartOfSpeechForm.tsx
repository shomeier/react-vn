import * as React from 'react';
// import { cmis } from 'cmis';
import { cmis } from '../lib/cmis';
import { Form, FormControl } from 'react-bootstrap';
import { CmisOptions } from './CmisOptions';

interface Props {
    cmisSession: cmis.CmisSession,
};

export const PartOfSpeechForm: React.StatelessComponent<Props> = (props) => {

    const cmisSession = props.cmisSession;
    return (
        <div className="partOfSpeechForm">
            <Form.Control>Part Of Speech</Form.Control>
            <Form.Control
                placeholder="select">
                <CmisOptions cmisSession={cmisSession} typeDefinitionId='P:lingo:partOfSpeech' propertyDefinitionId='lingo:partOfSpeech' />
            </Form.Control>
        </div>
    );
}

export default PartOfSpeechForm;