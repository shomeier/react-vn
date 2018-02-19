import React, { Component, TextField } from 'react';
import logo from '../logo.svg';
import LoginControl from './LoginControl';
import { cmis  } from '../lib/cmis.js';
import './app.css';

class App extends Component {
  render() {
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            <button onClick={() => cmisLogin()} />
            To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        </div>
        <div>
          <LoginControl />
        </div>
      </div>
    );
  }
}

function cmisLogin() {
  console.log("Logging in.1a.. ");
  // var session = new cmis.CmisSession('http://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.1/browser');
  var session = new cmis.CmisSession('http://127.0.0.1:8080/alfresco/api/-default-/public/cmis/versions/1.1/browser');
  // var session = new cmis.CmisSession('https://cmis.alfresco.com/api/-default-/public/cmis/versions/1.1/browser');
  console.log("Logging in.1.. ");
  session.setCredentials('admin', 'admin');
  session.setErrorHandler(err => console.log(err.stack));
  session.
    session.loadRepositories().then(() => {
      console.log("Loaded repos");
      console.log("Repos: " + JSON.stringify(session.defaultRepository));
    }).catch(err => {
      console.log("Error1: " + err)
      console.log("Error2: " + JSON.stringify(err))
      console.log("Error3: " + JSON.stringify(err.response))
    }
    );
}

export default App;
