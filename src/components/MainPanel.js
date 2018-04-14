import React, {Component} from 'react';
// import React, { Component } from 'react';
// import cmis from 'cmis';
import './css/MainPanel.css';
import { MainNavBar } from './MainNavBar.js';

class MainPanel extends Component {
    constructor(props) {
        super(props);
        this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    }
    
    handleMenuItemClick(item, e) {
        e.preventDefault();
        console.log("Menu Item clicked: " + item )
    }
    
    render() {

        const cmisSession = this.props.cmisSession;

        return (
        <MainNavBar
            isAdmin={cmisSession.username === "admin"}
            cmisSession={cmisSession}
            onMenuItemClick={this.handleMenuItemClick}/>
        // <div className="searchPanel">
        //     Success. Logged in as {cmisSession.username}.
        //     <p/>
        //     <SearchPanel cmisSession={cmisSession}/>
        // </div>
        )
    };
}

export default MainPanel;