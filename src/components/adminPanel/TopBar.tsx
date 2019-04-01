import * as React from 'react';
import { Button, Col, Form, FormControl, FormGroup } from 'react-bootstrap';
import '../css/generic.css';

interface Props {
    onClick: any;
    language: string;
};

interface State {
    selectedOption: string;
}

export class TopBar extends React.Component<Props> {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleChange(e) {
        // DO NOT CALL preventDefault() here, otherwise the radio buttons are not checked properly
        // e.preventDefault();
        this.props.onClick(e.target.value);
    }

    render() {

        const language = this.props.language;
        return (
            <div className="alignRight">
                <Form inline>
                    <FormGroup>
                        <Form.Check value='en' checked={(language === 'en')} onChange={this.handleChange}  name="radioGroup" inline>
                            English
                    </Form.Check>
                        <Form.Check value='vn' checked={(language === 'vn')} onChange={this.handleChange}  name="radioGroup" inline>
                            Vietnamese
                    </Form.Check>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default TopBar;