import React, { Component } from 'react';
import cmis from 'cmis';
// import { cmis } from '../lib/cmis';
import './css/AddWordPanel.css';
import { Button } from 'react-bootstrap';

export function AddWordPanel(props) {

    const cmisSession = props.cmisSession;

    return (
        <div className="addWordPanel">
            We are in addWord panel!
        </div>
    );
}

export default AddWordPanel;