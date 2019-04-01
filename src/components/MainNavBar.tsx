import * as React from 'react';
const logo = require('../assets/vietnam_round_icon_64.png');
// import * as cmis from 'cmis';
import { cmis } from '../lib/cmis';
import './css/MainNavBar.css';
import { Button, FormGroup, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap';

export function MainNavBar(props) {

    const isAdmin = props.isAdmin;
    console.log("isAdmin: " + isAdmin);
    const cmisSession = props.cmisSession;

    return (
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
        /**
        <Navbar.Form pullLeft>
            <FormGroup>
                <FormControl type="text" placeholder="Search" />
            </FormGroup>{' '}
            <Button type="submit">Submit</Button>
        </Navbar.Form>
        <Navbar.Collapse>
            <Navbar.Text pullRight>
                Signed in as: {cmisSession.username}
            </Navbar.Text>
        </Navbar.Collapse>
        */
    );
}

export default MainNavBar;