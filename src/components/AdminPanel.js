import React from 'react';
// import React, { Component } from 'react';
// import cmis from 'cmis';
import './css/AdminPanel.css';
import { SearchPanel } from './SearchPanel.js';

function AdminPanel(props) {

    const cmisSession = props.cmisSession;
    return (
        <div className="searchPanel">
            Success. Logged in as {cmisSession.username}.
            <p/>
            <SearchPanel cmisSession={cmisSession}/>
        </div>
    );
}

export default AdminPanel;