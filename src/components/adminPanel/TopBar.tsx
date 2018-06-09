import * as React from 'react';
import { Button, Col, ControlLabel, Form, FormControl, FormGroup, Panel } from 'react-bootstrap';
import '../css/generic.css';

interface Props {
  // queryStatement:string;
  // onQueryTextChange:any;
  onQuerySubmit: any;
};

interface State {
  queryStatement: string;
}

export class TopBar extends React.Component<{}> {
  constructor(props) {
    super(props);

    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(e) {
    e.preventDefault();
    console.log("Add Word clicked ....");
  }

  render() {
    return (
      <div className="alignRight">
        <Button type="submit" onClick={this.handleAdd}>Add Word</Button>
      </div>
    );
  }
}

export default TopBar;