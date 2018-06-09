import * as React from 'react';
// import React, { Component } from 'react';
// import { cmis } from 'cmis';
import { cmis } from '../../lib/cmis';
import { Col, Grid, Panel, Row, Table } from 'react-bootstrap';
import TopBar from './TopBar';
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
    }

    render() {

        return (
            <div>
                <Grid fluid={true}>
                    <Row className="show-grid">
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <TopBar/>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <LeftPanel cmisSession={this.props.cmisSession}/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    };
}
