import update from 'immutability-helper';
import * as React from 'react';
import { Button, Col, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';
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
    wordPropertyDef: CmisPropertyDefinition;
    partOfSpeechPropertyDef: CmisPropertyDefinition;
    languagePropertyDef: CmisPropertyDefinition;

    translation: Translation;
    // englishWord: string;
    // partOfSpeech: string;
    // vietnameseWord: string;
    // vietnameseLanguage: string;
}

export class AddWordPanel extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            wordPropertyDef: null, partOfSpeechPropertyDef: null, languagePropertyDef: null,
            translation: {sourceVocab: {word: null, partOfSpeech: null, language: null}, targetVocab: [{word: null, partOfSpeech: null, language: null}]}
        };
    }

    handleChange(item, event) {
        console.log("Target Value: " + JSON.stringify(event.target.value));
        console.log("Item: " + item);
        // this.setState({ [item]: event.target.value });
        const value = event.target.value;
        switch (item) {
            case 'sourceVocab.word':
                    const sV_word = update(this.state.translation, {
                        sourceVocab: {word: {$set: value} }
                    });
                    this.setState({ translation: sV_word });
                    break;
            case 'sourceVocab.partOfSpeech':
                const sV_partOfSpeech = update(this.state.translation, {
                    sourceVocab: {partOfSpeech: {$set: value}}
                });
                this.setState({ translation: sV_partOfSpeech });
                break;
            case 'sourceVocab.language':
                const sV_language = update(this.state.translation, {
                    sourceVocab: {language: { $set: value }}
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
        // const translation:Translation = {
        //     partOfSpeech: this.state.partOfSpeech,
        //     wordEn: this.state.englishWord,
        //     wordVn: this.state.vietnameseWord,
        //     languageVn: this.state.vietnameseLanguage 
        // }
        CmisSave.saveTanslation(cmisSession, this.state.translation);
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
                        <FormGroup controlId="sourceVocab">
                            <Col sm={7}>
                                <CmisFormControl
                                    // label='English Word'
                                    propertyDefinition={wordPropertyDef}
                                    onChange={this.handleChange}
                                    item='sourceVocab.word' />
                            </Col>
                            <Col sm={3}>
                                <CmisFormControl
                                    propertyDefinition={partOfSpeechPropertyDef}
                                    componentClass='select'
                                    onChange={this.handleChange}
                                    item='sourceVocab.partOfSpeech' />
                            </Col>
                            <Col sm={2}>
                                <CmisFormControl
                                    propertyDefinition={languagePropertyDef}
                                    componentClass='select'
                                    onChange={this.handleChange}
                                    item='sourceVocab.language' />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="targetVocab">
                            <Col sm={7}>
                                <CmisFormControl
                                    // label='Vietnamese Word'
                                    propertyDefinition={wordPropertyDef}
                                    onChange={this.handleChange}
                                    item='targetVocab.word' />
                            </Col>
                            <Col sm={5}>
                                <CmisFormControl
                                    propertyDefinition={languagePropertyDef}
                                    componentClass='select'
                                    onChange={this.handleChange}
                                    item='targetVocab.language' />
                            </Col>
                        </FormGroup>
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