import React, {useEffect, useState} from "react";
import './App.css';
import Chat from './Components/Chat';
import LoginForm from "./Components/LoginForm";
import Axios from './http/axios';

function App() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            Axios.get('/user/auth_data')
                .then(response => {
                    setUserData(response.data)
                })
                .catch(console.error)
                .finally(() => {
                    setLoading(false);
                })
        }

        setLoading(false);
    }, []);

    return (
        <div className="App">
            {loading === false && (
                <header className="App-header">
                    {
                        !userData ? <LoginForm setUserData={setUserData}/> : <Chat userData={userData}/>
                    }
                </header>
            )}
        </div>
    );
}

export default App;
