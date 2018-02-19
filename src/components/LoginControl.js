import React, { Component, TextField } from 'react';
import logo from '../assets/vietnam_round_icon_256.png';
import './login.css';

class LoginControl extends Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = { isLoggedIn: false };
    }

    handleLoginClick() {
        this.setState({ isLoggedIn: true });
    }

    handleLogoutClick() {
        this.setState({ isLoggedIn: false });
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;

        let div = null;
        if (isLoggedIn) {
            div = <LoginForm onClick={this.handleLoginClick} />;
        } else {
            div = <LoginForm onClick={this.handleLoginClick} />;
        }

        return (
            <div>
                {div}
            </div>
        );
    }
}

function LoginForm(props) {
    return (
        <div class="modal">
            <form className="modal-content animate">
                <div class="imgcontainer">
                    <img src={logo} alt="Avatar" class="avatar" />
                </div>
                <div class="container">
                    <label>
                        <b>Name:</b>
                        <input type="text" name="name" />
                    </label>
                    <label>
                        <b>Password:</b>
                        <input type="password" name="password" />
                    </label>
                    <button type="submit">
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginControl;