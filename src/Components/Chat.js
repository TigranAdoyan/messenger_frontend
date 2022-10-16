import React, {useCallback, useEffect, useState} from "react";
import io from 'socket.io-client';

const events = {
   send_message: 'send_message',
   receive_msg: 'receive_msg',
   sync_msg: 'sync_msg',
   join_room: 'join_room',
   sync_user_info: 'sync_user_info'
}

const socket = io('http://localhost:3334/message', {auth: {token: 'ioabwpd98haliuwbdikauwujbd'}});

socket.on('connect', () => {
   console.log('socket connected');
})

// socket.on('connect_error', (e) => {
//    console.error(e);
// })

function Chat() {
   const [messagesList, setMessagesList] = useState([]);
   const [currentMessage, setMessage] = useState('');
   const [user, setUser] = useState({username: ''});
   const [currentRoom, setRoom] = useState('');

   const onChange = useCallback((e) => {
      if (e.target.name === 'message') {
         setMessage(e.target.value);
      } else if (e.target.name === 'room') {
         setRoom(e.target.value);
      }
   }, [])

   const onSubmit = useCallback((e) => {
      if (e.type === 'click' || e.key === 'Enter') {
         if (e.target.name === 'message') {
            socket.emit(events.send_message, {
               message: currentMessage,
            })
         } else if (e.target.name === 'room') {
            socket.emit(events.join_room, {
               room: currentRoom,
            })
         }
      }
   }, [currentMessage, currentRoom])

   const _syncMessagesHandler = useCallback((messages) => {
      setMessagesList(messages)
   }, []);

   const _syncUserInfoHandler = useCallback((user) => {
      setUser(user)
   }, []);

   const _receiveHandler = useCallback((message) => {
      setMessagesList(prevState => {
         return [
            ...prevState,
            message
         ]
      })
   }, []);

   useEffect(() => {
      socket.on(events.sync_msg, _syncMessagesHandler)
      socket.on(events.sync_user_info, _syncUserInfoHandler)
      socket.on(events.receive_msg, _receiveHandler)

      return () => {
         socket.off(events.sync_msg, _syncMessagesHandler)
         socket.off(events.sync_user_info, _syncUserInfoHandler)
         socket.off(events.receive_msg, _receiveHandler)
      }
   }, [])

   return (
       <div className="App">
          <div>
             Messanger
          </div>

          <div>
             username: {user.username || '-'}
          </div>

          <div className="message_container">
             {
                messagesList.map(({id, message}, index) => {
                   return <span key={id} className="message_row">
                                <span> sender: {id} :=> </span>
                                <span> {message} </span>
                            </span>
                })
             }
          </div>

          <div className="interaction_container">
             <div className="interaction_container_row">
                <input
                    type="text"
                    name="message"
                    placeholder="Message"
                    value={currentMessage}
                    onChange={onChange}
                    onKeyDown={onSubmit}
                />

                <button name='message' onClick={onSubmit}>
                   Send
                </button>
             </div>

             <div className="interaction_container_row">
                <input
                    type="text"
                    name="room"
                    placeholder="Room"
                    value={currentRoom}
                    onChange={onChange}
                    onKeyDown={onSubmit}
                />

                <button name='room' onClick={onSubmit}>
                   Join
                </button>
             </div>
          </div>
       </div>
   );
}

export default Chat;
