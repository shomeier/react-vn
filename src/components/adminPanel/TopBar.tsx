import * as React from 'react';
import { Button, Col, ControlLabel, Form, FormControl, FormGroup, Panel, Radio } from 'react-bootstrap';
import '../css/generic.css';

interface Props {
    // queryStatement:string;
    // onQueryTextChange:any;
    //   onClickAddWord: any;
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
        // e.preventDefault();
        this.props.onClick(e.target.value);
    }

    render() {

        const language = this.props.language;
        return (
            <div className="alignRight">
                <Form inline>
                    <FormGroup>
                        <Radio value='en' checked={(language === 'en')} onChange={this.handleChange}  name="radioGroup" inline>
                            English
                    </Radio>
                        <Radio value='vn' checked={(language === 'vn')} onChange={this.handleChange}  name="radioGroup" inline>
                            Vietnamese
                    </Radio>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default TopBar;