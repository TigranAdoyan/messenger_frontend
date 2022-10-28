import React, {useCallback, useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {loginRequest} from '../redux/profile/reducer';

const defaultState = {
    username: '',
    password: ''
};

function LoginForm({setUserData}) {
    const dispatch = useDispatch();
    const {
        profileData,
        isLoginRequest,
        isLoginSuccess,
        isLoginFailure,
        errorMessage: err
    } = useSelector(({profile}) => profile);
    debugger;
    const [loginData, setLoginData] = useState(defaultState);
    const [errorMessage, setErrorMessage] = useState('');

    const onChange = useCallback((e) => {
        setLoginData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));

        return () => {
            setLoginData(defaultState)
        }
    }, []);

    const onSubmit = useCallback(async () => {
        setErrorMessage('');

        const body = {
            username: loginData.username,
            password: loginData.password
        };

        dispatch(loginRequest(body));
    }, [loginData]);

    useEffect(() => {

    }, []);

    return (
        <div className="interaction_container">
            <h2> Messenger </h2>

            <div className="interaction_container_row">
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={loginData.username}
                    onChange={onChange}
                />
            </div>

            <div className="interaction_container_row">
                <input
                    type="text"
                    name="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={onChange}
                />
            </div>

            <div className="interaction_container_row">
                {
                    errorMessage && <span style={{color: 'red', fontSize: '12px'}}> {errorMessage} </span>
                }
            </div>
            <div className="interaction_container_row">
                <button name='message' onClick={onSubmit}>
                    Send
                </button>
            </div>
        </div>
    )
}

export default LoginForm;