import { Container, Row, Col } from 'react-bootstrap';
import * as React from "react";
import { IsOptional } from 'prop-types';

interface Props {
    top?, left, center?, right?: any
}

export function SplitPanel(props: Props) {

    let top: any
    if (props.top) {
        top =
            <Row>
                <div className="SplitPanel-top">
                    {props.top}
                </div>
            </Row>
    } else {
        top = <div />
    }

    const cols = [
        <Col key="SplitPanel-left">
            <div className="SplitPanel-left">
                {props.left}
            </div>
        </Col>
    ]
    if (props.center) {
        cols.push(
            <Col key="SplitPanel-center">
                <div className="SplitPanel-center">
                    {props.center}
                </div>
            </Col>)
    }
    if (props.right) {
        cols.push(
            <Col key="SplitPanel-right">
                <div className="SplitPanel-right">
                    {props.right}
                </div>
            </Col>)
    }

    return (
        <div className="SplitPanel">
            <Container fluid={true}>
                {top}
                <Row>
                    {cols}
                </Row>
            </Container>
        </div>
    );
}