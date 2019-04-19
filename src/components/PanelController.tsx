import * as React from 'react';
import { cmis } from '../lib/cmis';
import { MainNavBar } from './MainNavBar';
import { WelcomePanel } from './panel/WelcomePanel';
import { AdminMain } from './adminPanel/AdminMain';

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
        switch (this.state.panel) {
            case "addWord":
                centerPanel = <AdminMain cmisSession={cmisSession} />
                break;
            default:
                centerPanel = <WelcomePanel />
        }
        return (
            <div>
                <MainNavBar
                    isAdmin={true}
                    cmisSession={cmisSession}
                    onMenuItemClick={this.handleMenuItemClick} />
                <div className="mainPanel">
                    {centerPanel}
                </div>
            </div>
        )
    };
}

export default MainPanel;