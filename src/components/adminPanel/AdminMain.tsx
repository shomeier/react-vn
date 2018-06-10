import * as React from 'react';
// import React, { Component } from 'react';
// import { cmis } from 'cmis';
import { cmis } from '../../lib/cmis';
import { Button, Col, Grid, Panel, Row, Table } from 'react-bootstrap';
import TopBar from './TopBar';
import AddWord from './AddWord';
import LeftPanel from './LeftPanel';

interface Props {
    cmisSession: cmis.CmisSession,
};

interface State {
    showAddWord: boolean;
    language: string;
}

const DEFAULT_LANG = "en";

export class AdminMain extends React.Component<Props, State> {

    constructor(props) {
        super(props);
        this.handleOnChangeLanguage = this.handleOnChangeLanguage.bind(this);
        this.handleShowAddWord = this.handleShowAddWord.bind(this);
        this.handleCloseAddWord = this.handleCloseAddWord.bind(this);
        this.state = { showAddWord: false, language: DEFAULT_LANG };
    }

    handleOnChangeLanguage(newLanguage:string) {
        this.setState({language: newLanguage});
    }

    handleShowAddWord(event) {
        event.preventDefault();
        this.setState({ showAddWord: true });
    }

    handleCloseAddWord(event) {
        event.preventDefault();
        this.setState({ showAddWord: false });
    }

    render() {

        return (
            <div>
                <Grid fluid={true}>
                    <Row className="show-grid">
                        <Col xs={12} sm={12} md={12} lg={12}>
                            {console.log("Rendering TopBar again with language: " + this.state.language)}
                            <TopBar language={this.state.language} onClick={this.handleOnChangeLanguage}/>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <LeftPanel cmisSession={this.props.cmisSession} />
                            <div className="alignRight">
                                <Button type="submit" onClick={this.handleShowAddWord}>Add Word</Button>
                            </div>
                        </Col>
                    </Row>
                </Grid>
                <AddWord cmisSession={this.props.cmisSession} show={this.state.showAddWord} onHide={this.handleCloseAddWord} />
            </div>
        )
    };
}
