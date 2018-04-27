import React, { Component } from 'react';
// import React, { Component } from 'react';
// import cmis from 'cmis';
import './css/MainPanel.css';
import { MainNavBar } from './MainNavBar.js';
import { WelcomePanel } from './WelcomePanel.js';
import { AddWordPanel } from './AddWordPanel.js';

class MainPanel extends Component {
    constructor(props) {
        super(props);
        this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
        this.state = { panel: "welcome" }
    }

    handleMenuItemClick(item, e) {
        e.preventDefault();
        console.log("Menu Item clicked: " + item);
        this.setState({ panel: item })
    }

    render() {

        const cmisSession = this.props.cmisSession;
        // const centerPanel = <WelcomePanel/>;
        let centerPanel;
        switch(this.state.panel) {
            case "addWord":
                centerPanel = <AddWordPanel cmisSession={cmisSession}/>
                break;
            default:
                centerPanel = <WelcomePanel/>
        }
        return (
            <div className="mainPanel">
                <MainNavBar
                    isAdmin={cmisSession.username === "admin"}
                    cmisSession={cmisSession}
                    onMenuItemClick={this.handleMenuItemClick} />
                <div className="centerPanel">
                    {centerPanel}
                </div>
            </div>

            // <div className="searchPanel">
            //     Success. Logged in as {cmisSession.username}.
            //     <p/>
            //     <SearchPanel cmisSession={cmisSession}/>
            // </div>
        )
    };
}

export default MainPanel;