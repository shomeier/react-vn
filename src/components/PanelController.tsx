import * as React from 'react';
import { MainNavBar } from './MainNavBar';
import { SplitPanel } from './panels/generic/SplitPanel';
import { WritableWordTable } from './tables/WritableWordTable';
import WritableRelationshipsTable from './tables/WritableRelationshipsTable';

interface State {
    panel: string;
}

class MainPanel extends React.Component<{}, State> {
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

    // handleCellClick(cell) {
    //     let index = cell.row.index
    //     let cellData = data[0][index].succinctProperties[cell.column.id]
    //     let cellCoid = data[0][index].succinctProperties["cmis:objectId"]
    // }

    render() {

        let centerPanel;
        switch (this.state.panel) {
            case "addWord":
                // centerPanel = <AdminMain cmisSession={cmisSession} />
                centerPanel = <SplitPanel left={<WritableWordTable/>} />
                // centerPanel = <SplitPanel left={<WritableWordTable/>} center={<WritableRelationshipsTable/>} />
                // centerPanel = <SplitPanel left={<BootstrapWordTable />} />
                break;
            default:
                centerPanel = <SplitPanel left={<WritableWordTable />} />
                // centerPanel = <SplitPanel left={<BootstrapWordTable />} />
            // centerPanel = <SplitPanel left={<WelcomePanel />} center={<WelcomePanel />} />
        }
        return (
            <div>
                <MainNavBar
                    isAdmin={true}
                    onMenuItemClick={this.handleMenuItemClick} />
                <div className="mainPanel">
                    {centerPanel}
                </div>
            </div>
        )
    };
}

export default MainPanel;