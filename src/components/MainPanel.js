import React from 'react';
// import React, { Component } from 'react';
// import cmis from 'cmis';
import './css/MainPanel.css';
import { MainNavBar } from './MainNavBar.js';

function MainPanel(props) {

    const cmisSession = props.cmisSession;
    return (
        <MainNavBar cmisSession={cmisSession}/>
        // <div className="searchPanel">
        //     Success. Logged in as {cmisSession.username}.
        //     <p/>
        //     <SearchPanel cmisSession={cmisSession}/>
        // </div>
    );
}

export default MainPanel;