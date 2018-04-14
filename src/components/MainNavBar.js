import React, { Component } from 'react';
import logo from '../assets/vietnam_round_icon_64.png';
import cmis from 'cmis';
// import { cmis } from '../lib/cmis';
import './css/MainNavBar.css';
import {  Button, FormGroup, FormControl, MenuItem, Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';

export function MainNavBar(props) {

    const cmisSession = props.cmisSession;

    return (
        <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="/">SCA</a>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <NavItem eventKey={1} href="#">
                    Learn Dict
                </NavItem>
                <NavItem eventKey={2} href="#">
                    Learn Sheets
                </NavItem>
                <NavDropdown eventKey={3} title="Admin" id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1}>Add Words</MenuItem>
                    <MenuItem eventKey={3.2}>Edit Words</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={3.4}>Separated link</MenuItem>
                </NavDropdown>
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