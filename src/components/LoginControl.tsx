import * as React from 'react';
import { Button, Form, FormGroup, FormControl } from 'react-bootstrap';
import { cmis } from '../lib/cmis';
import { CmisSessionWrapper } from './cmis/CmisSessionWrapper';
// import './css/LoginControl.css';
import './css/main.css';
import './css/generic.css';
import MainPanel from './MainPanel';
import { CmisRepositoryInfo } from './cmis/model/CmisRepositoryInfo';

interface State {
    username: string;
    password: string;
    canLogin: boolean;
}

class LoginControl extends React.Component<{}, State>  {
    constructor(props) {
        super(props);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.state = { username: '', password: '', canLogin: false };
    }

    handleChangeUsername(event) {
        this.setState({ username: event.target.value });
    }
    
    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }
    
    handleLoginClick(event) {
        event.preventDefault();

        let session = CmisSessionWrapper.getInstance()
        session.setCredentials(this.state.username, this.state.password);
        let repositoryInfo = session.getRepositoryInfo();
        let canLogin = session.canLogin()
        this.setState({ canLogin: canLogin });
    }

    render() {
        const isLoggedIn = (this.state.canLogin) ? true : false;
        let body = null;
        if (isLoggedIn) {
            body = <MainPanel cmisSession={CmisSessionWrapper.getInstance().getWrappedSession()} />;
        } else {
            body = <LoginForm
                onChangeUsername={this.handleChangeUsername}
                onChangePassword={this.handleChangePassword}
                onLoginClick={this.handleLoginClick} />;
        }

        return (
            <div>
                {body}
            </div>
        );
    }
}

function LoginForm(props) {
    return (

        <div className="loginForm">
            <Form>
                <FormGroup controlId="formUserName">
                    <Form.Label>Name</Form.Label>
                    <FormControl onChange={props.onChangeUsername} type="text"/>
                </FormGroup>
                <FormGroup controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <FormControl onChange={props.onChangePassword} type="password"/>
                </FormGroup>
                <div className="alignRight">
                <Button onClick={props.onLoginClick} type="submit">Login</Button>
                </div>
            </Form>
        </div>
    )
}

export default LoginControl;