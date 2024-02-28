import React from 'react';
import LoginForm from "./LoginForm";
import {AdminActionType, useApi} from "../../Services/UseApi";

const Login = () => {

    const {...login} = useApi();
    const handleLogin = (email: string, password: string) => {
        console.log('Login', email, password);
        login.apiService(AdminActionType.LOGIN, {email, password}).then(r => console.log(r));
    }

    return (
        <div>
            <LoginForm onLogin={handleLogin}/>
        </div>
    );
};

export default Login;
