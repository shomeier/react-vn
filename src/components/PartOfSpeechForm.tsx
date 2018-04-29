import * as React from 'react';
// import { cmis } from 'cmis';
import { cmis } from '../lib/cmis';
import { ControlLabel, FormControl } from 'react-bootstrap';
import { CmisOptions } from './CmisOptions';

interface Props {
    cmisSession: cmis.CmisSession,
};

export const PartOfSpeechForm: React.StatelessComponent<Props> = (props) => {

    const cmisSession = props.cmisSession;
    return (
        <div className="partOfSpeechForm">
            <ControlLabel>Part Of Speech</ControlLabel>
            <FormControl
                componentClass="select"
                placeholder="select">
                <CmisOptions cmisSession={cmisSession} typeDefinitionId='P:lingo:partOfSpeech' propertyDefinitionId='lingo:partOfSpeech' />
            </FormControl>
        </div>
    );
}

export default PartOfSpeechForm;