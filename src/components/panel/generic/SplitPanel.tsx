import { Container, Row, Col } from 'react-bootstrap';
import * as React from "react";

export function SplitPanel(props) {

    const retVal = [
        <Col>
            <div className="SplitPanel-left">
                {props.left}
            </div>
        </Col>
    ]
    if (props.center) {
        retVal.push(
            < Col >
                <div className="SplitPanel-center">
                    {props.center}
                </div>
            </Col >)
    }
    if (props.right) {
        retVal.push(
            <Col>
                <div className="SplitPanel-right">
                    {props.right}
                </div>
            </Col>)
    }

    return (
        <div className="SplitPanel">
            <Container>
                <Row>
                    {retVal}
                </Row>
            </Container>
        </div>
    );
}