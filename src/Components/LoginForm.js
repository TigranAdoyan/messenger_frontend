import React, {useCallback, useState} from "react";

const defaultState = {
   username: '',
   password: ''
}

function LoginForm({setToken}) {
   const [loginData, setLoginData] = useState(defaultState);

   const onChange = useCallback((e) => {
      setLoginData((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value
      }))

      return () => {
         setLoginData(defaultState)
      }
   }, [])

   const onSubmit = useCallback(async () => {
      try {
         const response = await fetch('http://localhost:3333/user/login', {
            method: 'POST',
            body: {
               username: loginData.username,
               password: loginData.password
            }
         })

         console.log(response);
      } catch (e) {
         console.log(e.message);
      }
   }, [loginData])

   return (
       <div className="interaction_container">
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
             <button name='message' onClick={onSubmit}>
                Send
             </button>
          </div>

          {/*<div className="interaction_container_row">*/}
          {/*   <input*/}
          {/*       type="text"*/}
          {/*       name="room"*/}
          {/*       placeholder="Room"*/}
          {/*       value={currentRoom}*/}
          {/*       onChange={onChange}*/}
          {/*       onKeyDown={onSubmit}*/}
          {/*   />*/}

          {/*   <button name='room' onClick={onSubmit}>*/}
          {/*      Join*/}
          {/*   </button>*/}
          {/*</div>*/}
       </div>
   )
}

export default LoginForm;