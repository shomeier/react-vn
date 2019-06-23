import * as React from 'react';
import { useState } from 'react';
import { MainNavBar } from './MainNavBar';
import AddWordCompoundPanel from './panels/compound/AddWordCompoundPanel';

export default function PanelController() {

    const [panel, setPanel] = useState()

    const handleMenuItemClick = (item, e) => {
        e.preventDefault();
        console.log("Menu Item clicked: " + item);
        setPanel(item);
    }

    // default is AddWordCompoundPanel
    let centerPanel = <AddWordCompoundPanel/>;
    switch (panel) {
        case "addWord":
            centerPanel = <AddWordCompoundPanel/>
            break;
        default:
            centerPanel = <AddWordCompoundPanel/>
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
