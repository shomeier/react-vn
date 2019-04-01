import * as React from 'react';
import { Button, Col, Form, FormControl, FormGroup } from 'react-bootstrap';

interface Props {
  // queryStatement:string;
  // onQueryTextChange:any;
  onQuerySubmit: any;
};

interface State {
  queryStatement: string;
}

export class QueryBar extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.handleQueryTextChange = this.handleQueryTextChange.bind(this);
    this.handleQuerySubmit = this.handleQuerySubmit.bind(this);

    let defaultStatement = 'SELECT d.cmis:objectId, w.lingo:word FROM cmiscustom:document AS d JOIN lingo:word AS w ON d.cmis:objectId = w.cmis:objectId';
    this.state = { queryStatement: defaultStatement };
  }

  handleQueryTextChange(e) {
    // this.props.onQueryTextChange(e.target.value);
    this.setState({ queryStatement: e.target.value });
  }

  handleQuerySubmit(e) {
    e.preventDefault();
    this.props.onQuerySubmit(this.state.queryStatement);
  }

  render() {
    return (
      <Form>
        <FormGroup controlId="queryBarInlineQueryStatement">
          {/* <ControlLabel>Query</ControlLabel>{' '} */}
          <Col sm={10}>
            <FormControl
              type="text"
              // placeholder="SELECT d.cmis:objectId, w.lingo:word FROM cmiscustom:document AS d JOIN lingo:word AS w ON d.cmis:objectId = w.cmis:objectId"
              value={this.state.queryStatement}
              onChange={this.handleQueryTextChange}
            />
          </Col>
          <Col sm={2}>
            <Button type="submit" onClick={this.handleQuerySubmit}>Query</Button>
          </Col>
        </FormGroup>{' '}
      </Form>
    );
  }
}

export default QueryBar;