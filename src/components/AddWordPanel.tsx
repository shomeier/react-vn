import update from 'immutability-helper';
import * as React from 'react';
import { Button, Col, ControlLabel, Form, FormControl, FormGroup, Panel } from 'react-bootstrap';
import { CmisFormControlProps, CmisFormControl } from './cmis/CmisFormControl';
// import { cmis } from 'cmis';
import { cmis } from '../lib/cmis';
import { CmisPropertyDefinition } from "../model/CmisJson";
import { Translation } from "../model/CmisTranslation";
import { CmisSave } from "../util/CmisSave";
import './css/AddWordPanel.css';

interface Props {
    cmisSession: cmis.CmisSession,
};

interface State {
    propDefsLoaded: boolean;
    translation: Translation;
}

export class AddWordPanel extends React.Component<Props, State> {

    private wordPropDef: CmisPropertyDefinition;
    private partOfSpeechPropDef: CmisPropertyDefinition;
    private languagePropDef: CmisPropertyDefinition;

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            propDefsLoaded: false,
            translation: {
                sourceVocab: {
                    word: null,
                    partOfSpeech: null,
                    language: null
                },
                targetVocab: [{
                    word: null,
                    partOfSpeech: null,
                    language: null
                }]
            }
        };
    }

    handleChange(item, event) {
        const value = event.target.value;
        switch (item) {
            case 'sourceVocab.word':
                const sV_word = update(this.state.translation, {
                    sourceVocab: { word: { $set: value } }
                });
                this.setState({ translation: sV_word });
                break;
            case 'sourceVocab.partOfSpeech':
                const sV_partOfSpeech = update(this.state.translation, {
                    sourceVocab: { partOfSpeech: { $set: value } }
                });
                this.setState({ translation: sV_partOfSpeech });
                break;
            case 'sourceVocab.language':
                const sV_language = update(this.state.translation, {
                    sourceVocab: { language: { $set: value } }
                });
                this.setState({ translation: sV_language });
                break;
            case 'targetVocab.word':
                const tV_word = update(this.state.translation, {
                    targetVocab: { 0: { word: { $set: value } } }
                });
                this.setState({ translation: tV_word });
                break;
            case 'targetVocab.language':
                const tV_language = update(this.state.translation, {
                    targetVocab: { 0: { language: { $set: value } } }
                });
                this.setState({ translation: tV_language });
                break;
            default:
                break;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const cmisSession = this.props.cmisSession;
        CmisSave.saveTanslation(cmisSession, this.state.translation);
    }

    componentDidMount() {
        // load all required cmis property definitions ...
        const cmisSession = this.props.cmisSession;
        cmisSession.getTypeDefinition('P:lingo:partOfSpeech').then((res) => {
            this.partOfSpeechPropDef = res.propertyDefinitions['lingo:partOfSpeech'];
            cmisSession.getTypeDefinition('P:lingo:word').then((res) => {
                this.wordPropDef = res.propertyDefinitions['lingo:word'];
                cmisSession.getTypeDefinition('P:lingo:language').then((res) => {
                    this.languagePropDef = res.propertyDefinitions['lingo:language'];
                    this.setState({propDefsLoaded: true});
                });
            });
        });
    }

    isReady() {
        if ((this.state.propDefsLoaded))
            return true;
    }

    render() {
        return (
            <div className="addWordPanel">
                {this.isReady() ? (
                    <Form horizontal>
                        <FormGroup controlId="sourceVocab">
                            <Col sm={7}>
                                <CmisFormControl
                                    // label='English Word'
                                    propertyDefinition={this.wordPropDef}
                                    onChange={this.handleChange}
                                    item='sourceVocab.word' />
                            </Col>
                            <Col sm={3}>
                                <CmisFormControl
                                    propertyDefinition={this.partOfSpeechPropDef}
                                    componentClass='select'
                                    onChange={this.handleChange}
                                    item='sourceVocab.partOfSpeech' />
                            </Col>
                            <Col sm={2}>
                                <CmisFormControl
                                    propertyDefinition={this.languagePropDef}
                                    componentClass='select'
                                    onChange={this.handleChange}
                                    item='sourceVocab.language' />
                            </Col>
                        </FormGroup>
                        <Panel>
                            <Panel.Body>
                                <FormGroup controlId="targetVocab">
                                    <Col sm={7}>
                                        <CmisFormControl
                                            // label='Vietnamese Word'
                                            propertyDefinition={this.wordPropDef}
                                            onChange={this.handleChange}
                                            item='targetVocab.word' />
                                    </Col>
                                    <Col sm={5}>
                                        <CmisFormControl
                                            propertyDefinition={this.languagePropDef}
                                            componentClass='select'
                                            onChange={this.handleChange}
                                            item='targetVocab.language' />
                                    </Col>
                                </FormGroup>
                            </Panel.Body>
                        </Panel>
                        <Button type="submit" onClick={this.handleSubmit}>Save</Button>
                    </Form>
                )
                    :
                    <div>Loading ...</div>
                }
            </div>
        );
    }
}

export default AddWordPanel;