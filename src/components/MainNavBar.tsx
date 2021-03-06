import * as React from 'react';
const logo = require('../assets/vietnam_round_icon_64.png');
import { cmis } from '../lib/cmis';
import './css/MainNavBar.css';
import { Button, FormGroup, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap';

export function MainNavBar(props) {

    const isAdmin = props.isAdmin;
    console.log("isAdmin: " + isAdmin);

    return (
        <div className="mainNavBar">
            <Navbar>
                <Nav activeKey="1">
                    <Nav.Item>
                        <Nav.Link eventKey={1} onSelect={(e) => props.onMenuItemClick("learnDict", e)}>
                            Learn Dict
                    </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={2} onClick={(e) => props.onMenuItemClick("learnSheets", e)}>
                            Learn Sheets
                    </Nav.Link>
                    </Nav.Item>

                    {isAdmin && (
                        <NavDropdown title="Admin" id="basic-nav-dropdown">
                            <NavDropdown.Item eventKey={3.1} onClick={(e) => props.onMenuItemClick("addWord", e)}>Add Word</NavDropdown.Item >
                            <NavDropdown.Item eventKey={3.2} onClick={(e) => props.onMenuItemClick("editWord", e)}>Edit Words</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item eventKey={3.4}>Separated link</NavDropdown.Item>
                        </NavDropdown>
                    )
                    }
                </Nav>
            </Navbar>
        </div>
    );
}

export default MainNavBar;