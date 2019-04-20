import * as React from "react";
import { Button, Form, FormGroup, FormControl } from 'react-bootstrap';

export function LoginForm(props) {

    return (
        <div className="LoginForm">
            <Form onSubmit={props.onLoginClick}>
                <FormGroup controlId="formUserName">
                    <Form.Label>Name</Form.Label>
                    <FormControl onChange={props.onChangeUsername} type="text" />
                </FormGroup>
                <FormGroup controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <FormControl onChange={props.onChangePassword} type="password" />
                </FormGroup>
                <div className="alignRight">
                    <Button type="submit">Login</Button>
                </div>
            </Form>
        </div>
        )
}
