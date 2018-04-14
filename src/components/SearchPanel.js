import React from 'react';
// import React, { Component } from 'react';
// import cmis from 'cmis';
import { CmisQueryResultList } from './CmisQueryResultList.js';

export function SearchPanel(props) {

    const cmisSession = props.cmisSession;
    return (
        <div className="searchPanel">
            <CmisQueryResultList cmisSession={cmisSession} query="SELECT * FROM D:sho:word ORDER BY cmis:name ASC"/>
        </div>
    );
}

export default SearchPanel;