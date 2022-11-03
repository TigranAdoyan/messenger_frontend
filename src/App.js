import React, {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getAuthDataRequest} from './redux/profile/reducer';
import './App.css';
import Chat from './Components/chat/Chat';
import LoginForm from "./Components/LoginForm";
import usePreviousList from "./hooks/usePrevious";

function App() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [isAppReady, setIsAppReady] = useState(false);
   const {
      isGetAuthDataRequest,
      isGetAuthDataSuccess,
      isGetAuthDataFailure,
   } = useSelector(({profile}) => profile);


   const [
      prevIsGetAuthDataRequest,
   ] = usePreviousList([
      isGetAuthDataRequest,
   ])

   useEffect(() => {
      const token = localStorage.getItem('token');

      if (token) {
         dispatch(getAuthDataRequest());
      } else {
         setIsAppReady(true);
         navigate('/login');
      }
   }, []);

   useEffect(() => {
      if (prevIsGetAuthDataRequest && !isGetAuthDataRequest && isGetAuthDataSuccess) {
         setIsAppReady(true)
      }
   }, [isGetAuthDataRequest, isGetAuthDataSuccess]);

   useEffect(() => {
      if (prevIsGetAuthDataRequest && !isGetAuthDataRequest && isGetAuthDataFailure) {
         navigate('/login');
      }
   }, [isGetAuthDataRequest, isGetAuthDataFailure]);

   return (
       <div className="App">
          <header className="App-header">
             {
                 isAppReady && (
                     <Routes>
                        <Route path="/login" element={<LoginForm/>}/>
                        <Route path="/chat" element={<Chat/>}/>
                     </Routes>
                 )
             }
          </header>
       </div>
   );
}

export default App;
