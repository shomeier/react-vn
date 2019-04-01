import * as React from 'react';
import { Button, Form, FormGroup, FormControl } from 'react-bootstrap';
import { cmis } from '../lib/cmis';
// import './css/LoginControl.css';
import './css/main.css';
import './css/generic.css';
import MainPanel from './MainPanel';

interface State {
    username: string;
    password: string;
    cmisSession: cmis.CmisSession;
}

class LoginControl extends React.Component<{}, State>  {
    constructor(props) {
        super(props);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.state = { username: '', password: '', cmisSession: null };
    }

    handleChangeUsername(event) {
        this.setState({ username: event.target.value });
    }
    
    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }
    
    handleLoginClick(event) {
        event.preventDefault();

        // MacOs Alfreso installation: Port 8080
        // let cmisUrl = 'http://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.1/browser';
        // let cmisUrl = 'http://localhost:8080/core/browser/bedroom?cmisselector=repositoryInfo';
        // let cmisUrl = 'http://localhost:8080/core/browser/bedroom';
        let cmisUrl = 'http://localhost:8080/core/browser/lingo';
        // let cmisUrl = 'http://localhost:8082/alfresco/api/-default-/public/cmis/versions/1.1/browser';
        // let cmisUrl = 'http://127.0.0.1:8080/alfresco/api/-default-/public/cmis/versions/1.1/browser';
        // let cmisUrl = 'https://cmis.alfresco.com/api/-default-/public/cmis/versions/1.1/browser';
        
        let session = new cmis.CmisSession(cmisUrl);
        session.setErrorHandler(err => console.log(err.stack));
        session.defaultRepository = {
            repositoryName: "lingo",
            repositoryUrl: "http://localhost:8080/core/browser/lingo",
            rootFolderUrl: "http://localhost:8080/core/browser/lingo/root"
        };
        session.setCredentials(this.state.username, this.state.password).getRepositoryInfo().then(() => {
            this.setState({ cmisSession: session });
                console.log("Loaded repos");
                console.log("Repos: " + JSON.stringify(session.defaultRepository));
            }).catch(err => {
                    alert("Invalid credentials for username: " + this.state.username);
                    console.log("Error1: " + err)
                    console.log("Error2: " + JSON.stringify(err))
                    console.log("Error3: " + JSON.stringify(err.response))
        });
        // session.setCredentials(this.state.username, this.state.password).loadRepositories().then(() => {
        //     this.setState({ cmisSession: session });
        //     console.log("Loaded repos");
        //     console.log("Repos: " + JSON.stringify(session.defaultRepository));
        // }).catch(err => {
        //     alert("Invalid credentials for username: " + this.state.username);
        //     console.log("Error1: " + err)
        //     console.log("Error2: " + JSON.stringify(err))
        //     console.log("Error3: " + JSON.stringify(err.response))
        // });
    }

    render() {
        const isLoggedIn = (this.state.cmisSession) ? true : false;
        let body = null;
        if (isLoggedIn) {
            body = <MainPanel cmisSession={this.state.cmisSession} />;
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