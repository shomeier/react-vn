import * as React from 'react';
import { Button, Col, ControlLabel, Modal, Form, FormControl, FormGroup, Panel } from 'react-bootstrap';
import { cmis } from '../../lib/cmis';
import { CmisPropertyDefinition } from "../../model/CmisJson";
import { Translation } from "../../model/CmisTranslation";
import { CmisFormControl } from "../cmis/CmisFormControl";
import { CmisControlller } from "../../util/CmisController";
import '../css/generic.css';

interface Props {
    show: boolean;
    onHide: any;
    cmisSession: cmis.CmisSession;
};

interface State {
    wordPropDef: CmisPropertyDefinition;
    partOfSpeechPropDef: CmisPropertyDefinition;
    languagePropDef: CmisPropertyDefinition;
    wordEn: string;
    partOfSpeech: string;
    wordVn: string;
}

export class AddWord extends React.Component<Props, State> {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSaveWord = this.handleSaveWord.bind(this);

        this.state = {
            wordPropDef: undefined,
            partOfSpeechPropDef: undefined,
            languagePropDef: undefined,
            wordEn: undefined,
            partOfSpeech: undefined,
            wordVn: undefined
        };
    }

    componentDidMount() {
        // load all required cmis property definitions ...
        console.log("Component did mount...");
        const cmisSession = this.props.cmisSession;
        cmisSession.getTypeDefinition('P:lingo:partOfSpeech').then((res) => {
            this.setState({ partOfSpeechPropDef: res.propertyDefinitions['lingo:partOfSpeech'] })
        });
        cmisSession.getTypeDefinition('P:lingo:word').then((res) => {
            this.setState({ wordPropDef: res.propertyDefinitions['lingo:word'] });
        });
        cmisSession.getTypeDefinition('P:lingo:language').then((res) => {
            this.setState({ languagePropDef: res.propertyDefinitions['lingo:language'] });
        });
    }

    isReady() {
        if ((this.state.wordPropDef) && (this.state.partOfSpeechPropDef) && (this.state.languagePropDef))
            return true;
    }

    handleChange(item, event) {
        const value = event.target.value;
        switch (item) {
            case 'sourceVocab.word':
                this.setState({ wordEn: value });
                break;
            case 'sourceVocab.partOfSpeech':
                this.setState({ partOfSpeech: value });
                break;
            case 'targetVocab.word':
                this.setState({ wordVn: value });    
                break;
            default:
                break;
        }
    }

    handleSaveWord(e) {
        e.preventDefault();
        console.log("Save Word clicked ...");
        const partOfSpeech = (this.state.partOfSpeech) ? (this.state.partOfSpeech) : this.state.partOfSpeechPropDef.defaultValue;
        let cmisSave = new CmisControlller(this.props.cmisSession);
        cmisSave.saveTanslation(
            {sourceVocab:
                {word: this.state.wordEn, partOfSpeech: partOfSpeech, language: 'en'},
            targetVocab:
                [
                    {word: this.state.wordVn, partOfSpeech: partOfSpeech, language: 'vn'}
                ]
            });
    }

    render() {
        return (
            <Modal
                {...this.props}
                aria-labelledby="contained-modal-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">
                        <strong>Add a new word</strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.isReady() ? (
                        <Form horizontal>
                            <FormGroup controlId="sourceVocab">
                                <Col sm={7}>
                                    <CmisFormControl
                                        // label='English Word'
                                        propertyDefinition={this.state.wordPropDef}
                                        onChange={this.handleChange}
                                        item='sourceVocab.word' />
                                </Col>
                                <Col sm={3}>
                                    <CmisFormControl
                                        propertyDefinition={this.state.partOfSpeechPropDef}
                                        componentClass='select'
                                        onChange={this.handleChange}
                                        item='sourceVocab.partOfSpeech' />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="targetVocab">
                                    <Col sm={7}>
                                        <CmisFormControl
                                            // label='Vietnamese Word'
                                            propertyDefinition={this.state.wordPropDef}
                                            onChange={this.handleChange}
                                            item='targetVocab.word' />
                                    </Col>
                                </FormGroup>
                        </Form>
                    )
                    :
                    <div>Loading ...</div>
                }
                </Modal.Body>
                <Modal.Footer>
                        <Button onClick={this.props.onHide}>Close</Button>
                        <Button type="submit" onClick={this.handleSaveWord}>Save Word</Button>
                    </Modal.Footer>
            </Modal>
                );
            }
        }
        
export default AddWord;