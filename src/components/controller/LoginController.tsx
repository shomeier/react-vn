import * as React from 'react';
import { cmis } from '../../lib/cmis';
import { CmisSessionWrapper } from '../cmis/CmisSessionWrapper'
import '../css/main.css';
import '../css/generic.css';
import MainPanel from '../PanelController';
import { CmisRepositoryInfo } from '../cmis/model/CmisSpecModels';
import { LoginForm } from '../forms/LoginForm';

export function LoginController() {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [canLogin, setCanLogin] = React.useState(false);
    
    let body = null;
    if (canLogin) {
        body = <MainPanel />
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