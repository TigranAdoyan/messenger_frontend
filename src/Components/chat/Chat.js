import React, {useEffect, useState} from "react";
import messenger, {listenEvents} from "../../services/messenger";
import SideBar from "./SideBar";

function Chat({userData}) {
   const [message, setMessage] = useState('');
   const [chatData, setChatData] = useState([]);
   const [activeTabUserId, setActiveTabUserId] = useState(null);

   const onSend = () => {
      if (message){
         messenger.sendMessage({
            receiverId: activeTabUserId,
            receiverType: 'user',
            msg: message
         });

         setChatData(prev => {
            return prev.map(item => {
               if (item.user.id === activeTabUserId) {
                  item.messages.push({
                     senderId: userData.id,
                     receiverId: activeTabUserId,
                     receiverType: 'user',
                     content: {
                        text: message
                     }
                  })
               }

               return item;
            })
         });

         setMessage('')}
   };

   const onReceive = (message) => {
      debugger;
   };

   useEffect(() => {
      messenger.bind(listenEvents.sync_app, setChatData);
      messenger.bind(listenEvents.send_message, onReceive);
   }, []);

   useEffect(() => {
      if (userData && userData.token) {
         messenger.connect(userData.token);
      }
   }, [userData]);

   return (
       <div className="App">
          <SideBar
              chatData={chatData}
              activeTabUserId={activeTabUserId}
              setActiveTabUserId={setActiveTabUserId}
          />
          <div>
             <div>
                Messenger
             </div>
             <div className="message_container">
                <div className="message_container_list">
                   {
                      activeTabUserId &&
                      chatData.find(({user}) => user.id === activeTabUserId).messages.map(message => {
                         const itemClassname = `message_container_item_${+message.senderId === userData.id ? 'right' : 'left'}`;

                         return (
                             <div className={itemClassname}>
                                  <span className="message_container_item_inner">
                                      {message.content.text}
                                  </span>
                             </div>
                         )
                      })}
                </div>

                <div className='message_container_inputing'>
                   <input
                       type="text"
                       name="message"
                       className="message_container_input"
                       placeholder="Message"
                       value={message}
                       onChange={({target: {value}}) => setMessage(value)}
                   />

                   <button name='message' onClick={onSend}>
                      Send
                   </button>
                </div>
             </div>
          </div>
       </div>
   );
}

export default Chat;
