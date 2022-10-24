import React, {useCallback, useEffect, useState} from "react";
import Axios from '../http/axios';

const defaultState = {
   username: '',
   password: ''
};

function LoginForm({setUserData}) {
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
      try {
         setErrorMessage('');

         const body = JSON.stringify({
            username: loginData.username,
            password: loginData.password
         });

         const response = await Axios.post('/user/login', body);

         localStorage.setItem('token', response.data.token);

         setUserData(response.data);
      } catch (e) {
         console.log(e);
         if (e.code === "ERR_NETWORK") {
            setErrorMessage('unknown error');
         } else {
            setErrorMessage(e.response.data.message);
         }

      }
   }, [loginData]);

   useEffect(() => {
      if (loginData.username && loginData.password) {
         onSubmit();
      }
   }, [])

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