import * as React from 'react';
const logo = require('../assets/vietnam_round_icon_256.png');
// import * as cmis from 'cmis';
// var cmis = require('cmis');  
import { cmis } from '../lib/cmis';
import './css/LoginControl.css';
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
        // event.preventDefault();

        let cmisUrl = 'http://127.0.0.1:8080/alfresco/api/-default-/public/cmis/versions/1.1/browser';
        // let cmisUrl = 'https://cmis.alfresco.com/api/-default-/public/cmis/versions/1.1/browser';

        console.log("cmis: " + cmis);
        console.log("cmis: " + JSON.stringify(cmis));

        let session = new cmis.CmisSession(cmisUrl);
        session.setErrorHandler(err => console.log(err.stack));
        session.setCredentials(this.state.username, this.state.password).loadRepositories().then(() => {
            this.setState({ cmisSession: session });
            console.log("Loaded repos");
            console.log("Repos: " + JSON.stringify(session.defaultRepository));
        }).catch(err => {
            alert("Invalid credentials for username: " + this.state.username);
            console.log("Error1: " + err)
            console.log("Error2: " + JSON.stringify(err))
            console.log("Error3: " + JSON.stringify(err.response))
        });
    }

    render() {
        const isLoggedIn = (this.state.cmisSession) ? this.state.cmisSession.defaultRepository : false;

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
            <div className="imgcontainer">
                {/* <img src={logo} alt="Avatar" className="avatar" /> */}
            </div>
            <input type="text" name="username" placeholder="Username" onChange={props.onChangeUsername} />
            <input type="password" name="password" placeholder="Password" onChange={props.onChangePassword} />
            <button className="loginButton" type="submit" onClick={props.onLoginClick}>
                Login
            </button>
        </div>
    )
}

export default LoginControl;