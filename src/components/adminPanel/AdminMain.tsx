import * as React from 'react';
// import React, { Component } from 'react';
// import { cmis } from 'cmis';
import { cmis } from '../../lib/cmis';
import { Col, Grid, Panel, Row, Table } from 'react-bootstrap';

interface Props {
    cmisSession: cmis.CmisSession,
};

interface State {
    panel: string;
}

export class AdminMain extends React.Component<Props, State> {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={5}>
                            <Panel>
                                <Table striped bordered condensed hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Username</th>
                                        </tr>
                                    </thead>
                                </Table>
                            </Panel>
                        </Col>
                        <Col xs={2}>
                            <Panel>
                                <Table striped bordered condensed hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Username</th>
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
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Username</th>
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
