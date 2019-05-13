import * as React from 'react';
import {useState} from 'react';
import { MainNavBar } from './MainNavBar';
import { SplitPanel } from './panels/generic/SplitPanel';
import { WritableWordTable } from './tables/WritableWordTable';
import WritableRelationshipsTable from './tables/WritableRelationshipsTable';

export default function PanelController() {

    const [panel, setPanel] = useState()

    const handleMenuItemClick = (item, e) => {
        e.preventDefault();
        console.log("Menu Item clicked: " + item);
        setPanel(item);
    }

    const handleCellClick = (cell) => {
        let index = cell.row.index
        let cellCoid = cell.data[index].succinctProperties["cmis:objectId"]
    }

        let centerPanel;
        switch (    panel) {
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
                    onMenuItemClick={handleMenuItemClick} />
                <div className="mainPanel">
                    {centerPanel}
                </div>
            </div>
        )
}
