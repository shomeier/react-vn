import * as React from 'react';
import { Button, Form, FormGroup, FormControl } from 'react-bootstrap';
import { cmis } from '../lib/cmis';
import { CmisSessionWrapper } from './cmis/CmisSessionWrapper';
import './css/main.css';
import './css/generic.css';
import MainPanel from './PanelController';
import { CmisRepositoryInfo } from './cmis/model/CmisRepositoryInfo';

function LoginControl() {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [canLogin, setCanLogin] = React.useState(false);

    let body = null;
    if (canLogin) {
        body = <MainPanel cmisSession={CmisSessionWrapper.getInstance().getWrappedSession()} />;
    } else {
        body = <LoginForm
            onChangeUsername={(event) => setUsername(event.target.value)}
            onChangePassword={(event) => setPassword(event.target.value)}
            onLoginClick={(event) => {
                event.preventDefault();
                let session = CmisSessionWrapper.getInstance()
                session.setCredentials(username, password)
                session.canLogin().then((loginSuccess) => {
                    setCanLogin(loginSuccess)
                });
            }} />;
    }

    return (
        <div>
            {body}
        </div>
    )
}

function LoginForm(props) {
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

export default LoginControl;