import * as React from 'react';
import { Button, Col, FormLabel, Modal, Form, FormControl, FormGroup } from 'react-bootstrap';
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
    // wordPropDef: CmisPropertyDefinition;
    partOfSpeechPropDef: CmisPropertyDefinition;
    languagePropDef: CmisPropertyDefinition;
    wordEn: string;
    partOfSpeech: string;
    wordVn: string;
    semantic: string;
}

export class AddWord extends React.Component<Props, State> {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSaveWord = this.handleSaveWord.bind(this);

        this.state = {
            // wordPropDef: undefined,
            partOfSpeechPropDef: undefined,
            languagePropDef: undefined,
            wordEn: undefined,
            partOfSpeech: undefined,
            wordVn: undefined,
            semantic: undefined
        };
    }

    componentDidMount() {
        // load all required cmis property definitions ...
        console.log("Component did mount...");
        const cmisSession = this.props.cmisSession;
        cmisSession.getTypeDefinition('P:lingo:part_of_speech').then((res) => {
            console.log("Trying to get partOfSpeech ...");
            this.setState({ partOfSpeechPropDef: res.propertyDefinitions['lingo:part_of_speech'] })
        });
        // cmisSession.getTypeDefinition('P:lingo:word').then((res) => {
        //     this.setState({ wordPropDef: res.propertyDefinitions['lingo:word'] });
        // });
        cmisSession.getTypeDefinition('P:lingo:language_vn').then((res) => {
            console.log("Trying to get language_vn ...");
            this.setState({ languagePropDef: res.propertyDefinitions['lingo:dialect'] });
        });
    }

    isReady() {
        if ((this.state.partOfSpeechPropDef) && (this.state.languagePropDef))
            return true;
    }

    handleChange(item, event) {
        const value = event.target.value;
        switch (item) {
            case 'sourceVocab.word':
                this.setState({ wordVn: value });
                break;
            case 'sourceVocab.partOfSpeech':
                this.setState({ partOfSpeech: value });
                break;
            case 'targetVocab.word':
                this.setState({ wordEn: value });
                break;
            case 'semantic':
                this.setState({ semantic: value });
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
        cmisSave.saveSimpleTranslation({
            partOfSpeech: this.state.partOfSpeech,
            wordVn: this.state.wordVn,
            semantic: this.state.semantic,
            wordEn: this.state.wordEn
        });
        // cmisSave.saveTanslation(
        //     {
        //         sourceVocab:
        //             { word: this.state.wordEn, partOfSpeech: partOfSpeech, language: 'en' },
        //         targetVocab:
        //             [
        //                 { word: this.state.wordVn, partOfSpeech: partOfSpeech, language: 'vn' }
        //             ]
        //     });
    }

    render() {
        return (
            <Modal
                // {...this.props}
                show={this.props.show}
                onHide={this.props.onHide}
                aria-labelledby="contained-modal-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">
                        <strong>Add a new word</strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.isReady() ? (
                        <Form>
                            <FormGroup controlId="sourceVocab">
                            
                                <Col sm={3}>
                                    <CmisFormControl
                                        propertyDefinition={this.state.partOfSpeechPropDef}
                                        componentClass='select'
                                        onChange={this.handleChange}
                                        item='sourceVocab.partOfSpeech' />
                                </Col>
                                 
                                 
                                <Col sm={7}>
                                    <FormLabel>VN Word</FormLabel>
                                    <FormControl
                                        onChange={(e) => { this.handleChange('sourceVocab.word', e) }}/>
                                </Col>
                                
                            </FormGroup>
                            
                            <FormGroup controlId="semantic">
                                <Col sm={10}>
                                    <FormLabel>Semantic</FormLabel>
                                    <FormControl
                                        onChange={(e) => { this.handleChange('semantic', e) }}/>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="wordEn">
                                <Col sm={10}>
                                    <FormLabel>English Word</FormLabel>
                                    <FormControl
                                        onChange={(e) => { this.handleChange('targetVocab.word', e) }}/>
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