import React, { Component } from 'react';
const logo = require('../assets/vietnam_round_icon_64.png');
import cmis from 'cmis';
// import { cmis } from '../lib/cmis';
import './css/MainNavBar.css';
import { Button, FormGroup, FormControl, MenuItem, Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';

export function MainNavBar(props) {

    const isAdmin = props.isAdmin;
    console.log("isAdmin: " + isAdmin);
    const cmisSession = props.cmisSession;

    return (
        <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="/">SCA</a>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <NavItem eventKey={1} onClick={(e) => props.onMenuItemClick("learnDict", e)}>
                    Learn Dict
                </NavItem>
                <NavItem eventKey={2} onClick={(e) => props.onMenuItemClick("learnSheets", e)}>
                    Learn Sheets
                </NavItem>

                {isAdmin && (
                    <NavDropdown eventKey={3} title="Admin" id="basic-nav-dropdown">
                        <MenuItem eventKey={3.1} onClick={(e) => props.onMenuItemClick("addWord", e)}>Add Word</MenuItem>
                        <MenuItem eventKey={3.2} onClick={(e) => props.onMenuItemClick("editWord", e)}>Edit Words</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={3.4}>Separated link</MenuItem>
                    </NavDropdown>
                )
                }
            </Nav>
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
        </Navbar>
    );
}

export default MainNavBar;