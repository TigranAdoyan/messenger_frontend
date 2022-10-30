import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import messenger, {listenEvents} from "../../services/messenger";
import Messages from "./Messages";
import SideBar from "./SideBar";

export default function Chat() {
   const {
      profileData
   } = useSelector(({profile}) => profile);
   const [chats, setChats] = useState([]);
   const [message, setMessage] = useState('');
   const [activeTabUserId, setActiveTabUserId] = useState(null);

   function onSend() {
      if (message) {
         const tempId = Date.now();
         const receiverId = activeTabUserId;

         messenger.sendMessage({
            receiverId,
            tempId,
            receiverType: 'user',
            msg: message
         }, (response) => {
            setChats(prev => prev.map(chat => {
               if (+chat.user.id === +response.receiverId) {
                  chat.messages = chat.messages.map(message => {
                     if (+message.tempId === +response.tempId) {
                        return response.message;
                     }
                     return message;
                  })
               }
               return chat;
            }))
         });

         setChats(prev => {
            return prev.map(item => {
               if (+item.user.id === +activeTabUserId) {
                  item.messages.push({
                     senderId: profileData.id,
                     receiverId: activeTabUserId,
                     seen: false,
                     tempId,
                     pending: true,
                     receiverType: 'user',
                     content: {
                        text: message
                     }
                  })
               }

               return item;
            })
         });

         setMessage('')
      }
   }

   function onFocusIn() {
      messenger.typingStatusChange({
         receiverId: activeTabUserId,
         status: true
      })
   }

   function onFocusOut() {
      messenger.typingStatusChange({
         receiverId: activeTabUserId,
         status: false
      })
   }

   // Socket events listeners
   function onReceive(message) {
      setChats(prev => prev.map((chat) => {
         if (+chat.user.id === +message.senderId) {
            chat.messages.push(message)
         }
         return chat;
      }));
   }

   function onSync(data) {
      setChats(data);
   }

   function onSeen(data) {
      setChats(prev => prev.map(chat => {
         if (chat.user.id === data.receiverId) {
            chat.messages = chat.messages.map(message => {
               if (data.messagesIds.includes(message._id)) {
                  message.seen = true;
               }
               return message;
            })
         }
         return chat;
      }))
   }

   function onOnlineStatusChange(data) {
      setChats(prev => prev.map(chat => {
         if (+chat.user.id === +data.userId) {
            chat.user.isOnline = data.status === 'online';
         }
         return chat;
      }))
   }

   function onTypingStatusChange(data) {
      setChats(prev => prev.map(chat => {
         if (+chat.user.id === +data.senderId) {
            chat.user.isTyping = data.status;
         }

         return chat;
      }))
   }

   useEffect(() => {
      if (activeTabUserId) {
         const chat = chats.find(chat => chat.user.id === activeTabUserId);
         if (chat) {
            const unseenMessagesIds = chat.messages.filter(({seen, senderId}) => !seen && +senderId === +activeTabUserId).map(({_id}) => _id);
            if (unseenMessagesIds.length) {
               // debugger;
               messenger.seenMessage({
                  senderId: activeTabUserId,
                  messagesIds: unseenMessagesIds
               })

               setChats(prev => prev.map(chat => {
                  if (chat.user.id === activeTabUserId) {
                     chat.messages = chat.messages.map(message => {
                        if (unseenMessagesIds.includes(message._id)) {
                           message.seen = true;
                        }

                        return message;
                     })
                  }

                  return chat;
               }))
            }
         }
      }
   }, [activeTabUserId, chats])

   useEffect(() => {
      if (profileData && profileData.token) {
         messenger.connect(profileData.token);
         messenger.bind(listenEvents.sync_app, onSync);
         messenger.bind(listenEvents.send_message, onReceive);
         messenger.bind(listenEvents.seen_message, onSeen)
         messenger.bind(listenEvents.online_status_change, onOnlineStatusChange)
         messenger.bind(listenEvents.typing_status_change, onTypingStatusChange)
      }
   }, [profileData]);

   return (
       <div className="App">
          <SideBar
              chats={chats}
              activeTabUserId={activeTabUserId}
              setActiveTabUserId={setActiveTabUserId}
          />
          <div>
             <div>
                Messenger
             </div>
             <div className="message_container">
                <Messages
                   activeTabUserId={activeTabUserId}
                   chats={chats}
                   profileData={profileData}
                   message={message}
                />

                {
                   chats.find(({user}) => +user.id === +activeTabUserId && user.isTyping === true) && (
                        <span style={{ marginBottom: '15px', fontSize: '10px', marginRight: 'auto' }} > typing... </span>
                    )
                }

                <div className='message_container_inputing'>
                   <input
                       type="text"
                       name="message"
                       className="message_container_input"
                       placeholder="Message"
                       value={message}
                       onFocus={onFocusIn}
                       onBlur={onFocusOut}
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
