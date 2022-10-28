import React, {useEffect, useState} from "react";
import { Routes, Route } from "react-router-dom";
import {useDispatch} from "react-redux";
import { loginRequest } from './redux/profile/reducer';
import './App.css';
import Chat from './Components/chat/Chat';
import LoginForm from "./Components/LoginForm";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Routes>
                    <Route path="/login" element={<LoginForm />}/>
                    <Route path="/chat" element={<Chat />}/>
                </Routes>
            </header>
        </div>
    );
}

export default App;
