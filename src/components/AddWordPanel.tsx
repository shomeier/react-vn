import * as React from 'react';
// import { cmis } from 'cmis';
import { cmis } from '../lib/cmis';
import './css/AddWordPanel.css';
import { Button, Col, ControlLabel, Form, FormGroup, FormControl, HelpBlock } from 'react-bootstrap';
import PartOfSpeechForm from './PartOfSpeechForm';

interface Props {
    cmisSession: cmis.CmisSession,
};

interface State {
    partOfSpeechPropertyDef: CmisPropertyDefinition;
}

interface CmisChoice {
    value: string;
    displayName: string;
}

export class AddWordPanel extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = { partOfSpeechPropertyDef: null };
    }

    componentDidMount() {
        const cmisSession = this.props.cmisSession;
        cmisSession.getTypeDefinition('P:lingo:partOfSpeech').then((res) => {
            // let options = res.propertyDefinitions['lingo:partOfSpeech'].choice
            this.setState({ partOfSpeechPropertyDef: res.propertyDefinitions['lingo:partOfSpeech'] });
        });
    }

    isReady() {
        if (this.state.partOfSpeechPropertyDef) {
            console.log("PoS: " + JSON.stringify(this.state.partOfSpeechPropertyDef));
            return true;
        }
    }

    render() {
        const cmisSession = this.props.cmisSession;
        const partOfSpeechPropertyDef = this.state.partOfSpeechPropertyDef;
        return (
            <div className="addWordPanel">
                {this.isReady() ? (
                <Form horizontal>
                    <FormGroup controlId="WordEnglish">
                        <Col sm={7}>
                            <ControlLabel>English word</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Enter english word" />
                        </Col>
                        <Col sm={5}>
                            <CmisFormControl propertyDefinition={partOfSpeechPropertyDef} />
                            {/* <PartOfSpeechForm options={cmisSession} /> */}
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
                </Form>)
                :
                <div>Loading ...</div>
                }
            </div>
        );
    }
}

interface CmisPropertyDefinition {
    displayName: string,
    description: string,
    choice: CmisChoice[]
}

interface CmisFormControlProps {
    propertyDefinition: CmisPropertyDefinition,
    value?: string;
};

const CmisFormControl: React.StatelessComponent<CmisFormControlProps> = (props) => {

    const propertyDefinition = props.propertyDefinition;
    let options = propertyDefinition.choice.map(function (itemData) {
        if (itemData.value === props.value) {
            return <option key={itemData.value} value={itemData.value} selected>{itemData.displayName}</option>;
        }
        else {
            return <option key={itemData.value} value={itemData.value}>{itemData.displayName}</option>;
        }
    });
    return (
        <div className="cmisFormControl">
            <ControlLabel>{propertyDefinition.displayName}</ControlLabel>
            <FormControl
                componentClass="select"
                placeholder="select">
                {options} 
                {/* <CmisOptions cmisSession={cmisSession} typeDefinitionId='P:lingo:partOfSpeech' propertyDefinitionId='lingo:partOfSpeech' /> */}
            </FormControl>
        </div>
    );
}

export default AddWordPanel;