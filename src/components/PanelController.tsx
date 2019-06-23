import * as React from 'react';
import { useState, useEffect } from 'react';
import { MainNavBar } from './MainNavBar';
import { SplitPanel } from './panels/generic/SplitPanel';
import { WritableWordQueryTable } from './tables/WritableWordQueryTable';
import WritableRelationshipsTable from './tables/WritableRelationshipsTable';
import GenericVerticalObjectTable from './tables/generic/GenericVerticalObjectTable';

export default function PanelController() {

    const [panel, setPanel] = useState()
    const [sourceCoid, setSourceCoid] = useState()
    const [targetCoid, setTargetCoid] = useState()

    const handleMenuItemClick = (item, e) => {
        e.preventDefault();
        console.log("Menu Item clicked: " + item);
        setPanel(item);
    }

    const handleSourceRowSelect = (row) => {
        console.log("In handleWordRowSelect ...")
        let index = row.index
        let coid = row.original.succinctProperties["cmis:objectId"]
        setSourceCoid(coid)
    }
    
    const handleRelationshipRowSelect = (row) => {
        console.log("In handleRelationshipRowSelect ...")
        // console.log("--------> relationships: " + JSON.stringify(row.original))
        let coid = row.original.succinctProperties["cmis:targetId"]
        setTargetCoid(coid)
    }

    let centerPanel;
    switch (panel) {
        case "addWord":
            // centerPanel = <AdminMain cmisSession={cmisSession} />
            // centerPanel = <SplitPanel left={<WritableWordTable />} />
            centerPanel = <SplitPanel 
                left={<WritableWordQueryTable language='vn' onRowSelect={handleSourceRowSelect} selectedWordCoid={sourceCoid}/>}
                center={<WritableRelationshipsTable onRowSelect={handleRelationshipRowSelect} sourceId={sourceCoid} />} 
                right={<GenericVerticalObjectTable coid={targetCoid} />}
                />
            // centerPanel = <SplitPanel left={<BootstrapWordTable />} />
            break;
        default:
            centerPanel = <SplitPanel
                left={<WritableWordQueryTable language='vn' onRowSelect={handleSourceRowSelect} selectedWordCoid={sourceCoid}/>}
                center={<WritableRelationshipsTable onRowSelect={handleRelationshipRowSelect} sourceId={sourceCoid} />} 
                right={<GenericVerticalObjectTable coid={targetCoid} />}
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
