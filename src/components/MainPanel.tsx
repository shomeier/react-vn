import React, { Component } from 'react';
// import React, { Component } from 'react';
// import { cmis } from 'cmis';
import { cmis } from '../lib/cmis';
import './css/MainPanel.css';
import { MainNavBar } from './MainNavBar';
import { WelcomePanel } from './WelcomePanel';
import { AddWordPanel } from './AddWordPanel';

interface Props {
    cmisSession: cmis.CmisSession,
};

interface State {
    panel: string;
}

class MainPanel extends React.Component<Props, State> {
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
                    // isAdmin={cmisSession.username === "admin"}
                    isAdmin={true}
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