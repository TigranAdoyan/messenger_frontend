import React, {useState} from "react";
import './App.css';
import Chat from './Components/Chat';

const events = {
   send_msg: 'send_msg',
   receive_msg: 'receive_msg',
   sync_msg: 'sync_msg',
   join_room: 'join_room',
   sync_user_info: 'sync_user_info'
}

function App() {
   const [token, setToken] = useState(null);


   return (
       <div className="App">
          <header className="App-header">
             <Chat/>
          </header>
       </div>
   );
}

export default App;
