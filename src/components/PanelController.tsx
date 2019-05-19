import * as React from 'react';
import { useState, useEffect } from 'react';
import { MainNavBar } from './MainNavBar';
import { SplitPanel } from './panels/generic/SplitPanel';
import { WritableWordQueryTable } from './tables/WritableWordQueryTable';
import WritableRelationshipsTable from './tables/WritableRelationshipsTable';
import GenericVerticalObjectTable from './tables/generic/GenericVerticalObjectTable';

export default function PanelController() {

    const [panel, setPanel] = useState()
    const [coid, setCoid] = useState()

    const handleMenuItemClick = (item, e) => {
        e.preventDefault();
        console.log("Menu Item clicked: " + item);
        setPanel(item);
    }

    const handleCellClick = (cell) => {
        console.log("In HandleCell Click...")
        let index = cell.row.index
        let cellCoid = cell.data[index].succinctProperties["cmis:objectId"]
        setCoid(cellCoid)
    }

    let centerPanel;
    switch (panel) {
        case "addWord":
            // centerPanel = <AdminMain cmisSession={cmisSession} />
            // centerPanel = <SplitPanel left={<WritableWordTable />} />
            centerPanel = <SplitPanel 
                left={<WritableWordQueryTable language='vn' handleCellClick={handleCellClick} />}
                center={<WritableRelationshipsTable coid={coid} />} 
                right={<GenericVerticalObjectTable coid={coid} />}
                />
            // centerPanel = <SplitPanel left={<BootstrapWordTable />} />
            break;
        default:
            centerPanel = <SplitPanel
                left={<WritableWordQueryTable language='vn' handleCellClick={handleCellClick} />}
                center={<WritableRelationshipsTable coid={coid} />} 
                right={<GenericVerticalObjectTable coid={coid} />}
                />
        // centerPanel = <SplitPanel left={<WritableWordTable />} />
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
