import React from 'react';
// import React, { Component } from 'react';
// import cmis from 'cmis';
import './AdminPanel.css';
import { CmisQueryResultList } from './CmisQueryResultList.js';

function AdminPanel(props) {

    const cmisSession = props.cmisSession;
    return (
        <div className="searchPanel">
            Success. Logged in as {cmisSession.username}.

            <CmisQueryResultList cmisSession={cmisSession} query="SELECT * FROM cmis:document"/>
        </div>
    );
}

export default AdminPanel;