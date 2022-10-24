import React, {useEffect, useState} from "react";
import './App.css';
import Chat from './Components/chat/Chat';
import LoginForm from "./Components/LoginForm";

function App() {
    const [userData, setUserData] = useState(null);

    return (
        <div className="App">
            <header className="App-header">
                {
                    !userData ? <LoginForm setUserData={setUserData}/> : <Chat userData={userData}/>
                }
            </header>
        </div>
    );
}

export default App;
