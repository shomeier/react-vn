import { Container, Row, Col } from 'react-bootstrap';
import * as React from "react";
import { IsOptional } from 'prop-types';

interface Props {
    left, center?, right?: any
}

export function SplitPanel(props: Props) {

    const retVal = [
        <Col key="SplitPanel-left">
            <div className="SplitPanel-left">
                {props.left}
            </div>
        </Col>
    ]
    if (props.center) {
        retVal.push(
            <Col key="SplitPanel-center">
                <div className="SplitPanel-center">
                    {props.center}
                </div>
            </Col>)
    }
    if (props.right) {
        retVal.push(
            <Col key="SplitPanel-right">
                <div className="SplitPanel-right">
                    {props.right}
                </div>
            </Col>)
    }

    return (
        <div className="SplitPanel">
            <Container fluid={true}>
                <Row>
                    {retVal}
                </Row>
            </Container>
        </div>
    );
}