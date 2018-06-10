import * as React from 'react';
import { Button, Col, ControlLabel, Modal, Form, FormControl, FormGroup, Panel } from 'react-bootstrap';
import { cmis } from '../../lib/cmis';
import '../css/generic.css';

interface Props {
  show:boolean;
  onHide: any;
  cmisSession:cmis.CmisSession;
};

interface State {
  queryStatement: string;
}

export class AddWord extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.handleSaveWord = this.handleSaveWord.bind(this);
  }

    componentDidMount() {
        // load all required cmis property definitions ...
        console.log("Component did mount...");
        // const cmisSession = this.props.cmisSession;
        // cmisSession.getTypeDefinition('P:lingo:partOfSpeech').then((res) => {
        //     this.partOfSpeechPropDef = res.propertyDefinitions['lingo:partOfSpeech'];
        //     cmisSession.getTypeDefinition('P:lingo:word').then((res) => {
        //         this.wordPropDef = res.propertyDefinitions['lingo:word'];
        //         cmisSession.getTypeDefinition('P:lingo:language').then((res) => {
        //             this.languagePropDef = res.propertyDefinitions['lingo:language'];
        //             this.setState({ propDefsLoaded: true });
        //         });
        //     });
        // });
    }

  handleSaveWord(e) {
    e.preventDefault();
    console.log("Save Word clicked ....");
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
                    Lorem Ipsum
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