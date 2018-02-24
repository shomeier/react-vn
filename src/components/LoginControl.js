import React, { Component } from 'react';
import logo from '../assets/vietnam_round_icon_256.png';
import cmis from 'cmis';
import './login.css';

class LoginControl extends Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    componentWillUpdate() {
        console.log("Component will update")
    }

    handleLoginClick(event) {
        event.preventDefault();
        console.log("Test....");
        // this.setState({ isLoggedIn: true });
        cmisLogin();
    }

    handleLogoutClick() {
        console.log("Test....");
        this.setState({ isLoggedIn: false });
    }

    render() {
        console.log("Test....");

        return (
            <div>
                <LoginForm onClick={this.handleLoginClick} />;
            </div>
        );
    }
}

function LoginForm(props) {
    return (
        <div className="modal">
            <form className="modal-content animate">
                <div className="imgcontainer">
                    <img src={logo} alt="Avatar" className="avatar" />
                </div>
                <div className="container">
                    <label>
                        <b>Name:</b>
                        <input type="text" name="name" />
                    </label>
                    <label>
                        <b>Password:</b>
                        <input type="password" name="password" />
                    </label>
                    <button type="submit" onClick={props.onClick}>
                        Login
                        </button>
                </div>
            </form>
        </div>
    )
}


function cmisLogin() {
    console.log("Logging in.1a.. ");
    console.log("cmis: " + cmis);
    // var session = new cmis.CmisSession('http://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.1/browser');
    let session = new cmis.CmisSession('http://127.0.0.1:8080/alfresco/api/-default-/public/cmis/versions/1.1/browser');
    // var session = new cmis.CmisSession('https://cmis.alfresco.com/api/-default-/public/cmis/versions/1.1/browser');
    console.log("Logging in.1.. ");
    session.setErrorHandler(err => console.log(err.stack));
    session.setCredentials('admin', 'admin').loadRepositories().then((res) => {
        console.log("Res: " + res);
        console.log("Loaded repos");
        console.log("Repos: " + JSON.stringify(session.defaultRepository));
    }).catch(err => {
        console.log("Error1: " + err)
        console.log("Error2: " + JSON.stringify(err))
        console.log("Error3: " + JSON.stringify(err.response))
    }
    );
}

export default LoginControl;