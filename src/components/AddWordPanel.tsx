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
    wordPropertyDef: CmisPropertyDefinition;
    partOfSpeechPropertyDef: CmisPropertyDefinition;
    languagePropertyDef: CmisPropertyDefinition;

    englishWord: string;
    partOfSpeech: string;
    vietnameseWord: string;
    vietnameseLanguage: string;
}

interface CmisChoice {
    value: string;
    displayName: string;
}

export class AddWordPanel extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            wordPropertyDef: null, partOfSpeechPropertyDef: null, languagePropertyDef: null,
            englishWord: null, partOfSpeech: null, vietnameseWord: null, vietnameseLanguage: null
        };
    }

    handleChange(item, event) {
        // console.log("Event: " + JSON.stringify(event));
        console.log("Target Value: " + JSON.stringify(event.target.value));
        console.log("Item: " + item);
        this.setState({ [item]: event.target.value });
    }

    componentDidMount() {
        const cmisSession = this.props.cmisSession;
        cmisSession.getTypeDefinition('P:lingo:partOfSpeech').then((res) => {
            this.setState({ partOfSpeechPropertyDef: res.propertyDefinitions['lingo:partOfSpeech'] });
        });
        cmisSession.getTypeDefinition('P:lingo:word').then((res) => {
            this.setState({ wordPropertyDef: res.propertyDefinitions['lingo:word'] });
        });
        cmisSession.getTypeDefinition('P:lingo:language').then((res) => {
            this.setState({ languagePropertyDef: res.propertyDefinitions['lingo:language'] });
        });
    }

    isReady() {
        if ((this.state.partOfSpeechPropertyDef) && (this.state.wordPropertyDef) && (this.state.languagePropertyDef))
            return true;
    }

    render() {
        const partOfSpeechPropertyDef = this.state.partOfSpeechPropertyDef;
        const wordPropertyDef = this.state.wordPropertyDef;
        const languagePropertyDef = this.state.languagePropertyDef;
        return (
            <div className="addWordPanel">
                {this.isReady() ? (
                    <Form horizontal>
                        <FormGroup controlId="WordEnglish">
                            <Col sm={7}>
                                <CmisFormControl
                                    label='English Word'
                                    propertyDefinition={wordPropertyDef}
                                    onChange={this.handleChange}
                                    item='englishWord'/>
                            </Col>
                            <Col sm={5}>
                                <CmisFormControl
                                    propertyDefinition={partOfSpeechPropertyDef}
                                    componentClass='select'
                                    onChange={this.handleChange}
                                    item='partOfSpeech'/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="WordVietnamese">
                            <Col sm={7}>
                                <CmisFormControl
                                    label='Vietnamese Word'
                                    propertyDefinition={wordPropertyDef}
                                    onChange={this.handleChange}
                                    item='vietnameseWord'/>
                            </Col>
                            <Col sm={5}>
                                <CmisFormControl
                                    propertyDefinition={languagePropertyDef}
                                    componentClass='select'
                                    onChange={this.handleChange}
                                    item='vietnameseLanguage'/>
                            </Col>
                        </FormGroup>
                        <Button type="submit">Save</Button>
                    </Form>
                )
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
    label?: string,
    propertyDefinition: CmisPropertyDefinition,
    value?: string;
    componentClass?: string;
    onChange?: any;
    item?: string;
};

const CmisFormControl: React.StatelessComponent<CmisFormControlProps> = (props) => {

    const propertyDefinition = props.propertyDefinition;
    const label = (props.label) ? props.label : propertyDefinition.displayName;
    const componentClass = (props.componentClass) ? props.componentClass : 'input';

    let options;
    if (componentClass === 'select') {
        options = propertyDefinition.choice.map(function (itemData) {
            if (itemData.value === props.value) {
                return <option key={itemData.value} value={itemData.value} selected>{itemData.displayName}</option>;
            }
            else {
                return <option key={itemData.value} value={itemData.value}>{itemData.displayName}</option>;
            }
        });
    }

    return (
        <div className="cmisFormControl">
            <ControlLabel>{label}</ControlLabel>
            <FormControl
                componentClass={componentClass}
                placeholder="select" onChange={(e) => props.onChange(props.item, e)}>
                {options}
            </FormControl>
        </div>
    );
}

export default AddWordPanel;