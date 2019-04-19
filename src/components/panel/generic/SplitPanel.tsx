import { Container, Row, Col } from 'react-bootstrap';

export function SplitPanel(props) {

    let retVal =
        <Col>
            <div className="SplitPanel-left">
                {props.left}
            </div>
        </Col>;
    if (props.center) {
        retVal = Object.assign(
            <Col>
                <div className="SplitPanel-center">
                    {props.center}
                </div>
            </Col>, retVal)
    }
    if (props.right) {
        retVal = Object.assign(
            <Col>
                <div className="SplitPanel-right">
                    {props.right}
                </div>
            </Col>, retVal)
    }

    return (
        <div className="SplitPanel">
            <Container fluid={true}>
                {retVal}
            </Container>
        </div>
    );
}