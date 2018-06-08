import * as React from 'react';
// import React, { Component } from 'react';
// import { cmis } from 'cmis';
import { cmis } from '../../lib/cmis';
import { Col, Grid, Panel, Row, Table } from 'react-bootstrap';
import QueryBar from './QueryBar';
import LeftPanel from './LeftPanel';

interface Props {
    cmisSession: cmis.CmisSession,
};

interface State {
    panel: string;
}

export class AdminMain extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        // this.handleQueryTextChange = this.handleQueryTextChange.bind(this);
        this.handleQuerySubmit = this.handleQuerySubmit.bind(this);

    }

    // handleQueryTextChange(e) {
    //     this.props.onQueryTextChange(e.target.value);
    //   }

    handleQuerySubmit(statement: string) {
        console.log("Query Statement: " + statement);
    }

    render() {

        return (
            <div>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={12}>
                            <QueryBar
                                onQuerySubmit={this.handleQuerySubmit}
                            />
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={5}>
                            <LeftPanel cmisSession={this.props.cmisSession}/>
                        </Col>
                        <Col xs={2}>
                            <Panel>
                                <Table striped bordered condensed hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Relationship</th>
                                        </tr>
                                    </thead>
                                </Table>
                            </Panel>
                        </Col>
                        <Col xs={5}>
                            <Panel>
                                <Table striped bordered condensed hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Word</th>
                                        </tr>
                                    </thead>
                                </Table>
                            </Panel>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    };
}
