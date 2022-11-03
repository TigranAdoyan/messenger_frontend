import React, {useCallback, useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import usePreviousList from "../hooks/usePrevious";
import {loginRequest} from '../redux/profile/reducer';
import {useNavigate} from "react-router-dom";

const defaultState = {
    username: '',
    password: ''
};

function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        isLoginRequest,
        isLoginSuccess,
        errorMessage
    } = useSelector(({profile}) => profile);
    const [loginData, setLoginData] = useState(defaultState);

    const [
        prevIsLoginRequest,
    ] = usePreviousList([
        isLoginRequest
    ])

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
        dispatch(loginRequest({
            username: loginData.username,
            password: loginData.password
        }));
    }, [loginData]);

    useEffect(() => {
          if (prevIsLoginRequest && isLoginSuccess) {
              navigate('/chat')
          }
    }, [prevIsLoginRequest, isLoginSuccess]);

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