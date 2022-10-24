import React, {useEffect, useState} from "react";
import messenger, {listenEvents} from "../../services/messenger";
import SideBar from "./SideBar";

function Chat({userData}) {
   const [message, setMessage] = useState('');
   const [chatBarList, setChatBarList] = useState([]);
   const [activeTab, setActiveTab] = useState(null);

   const onSend = () => {
      if (message && activeTab)
         messenger.sendMessage({
            receiverId: activeTab.id,
            receiverType: activeTab.type,
            msg: message
         })

      setChatBarList(prev => {
         return prev.map(item => {
            if (item.type === activeTab.type && item[item.type].id === activeTab.id) {
               item.messages.push({
                  senderId: userData.id,
                  receiverId: activeTab.id,
                  receiverType: activeTab.type,
                  content: {
                     text: message
                  }
               })
            }

            return item;
         })
      });

      setMessage('')
   };

   useEffect(() => {
      messenger.bind(listenEvents["server:sync"], setChatBarList)
   }, []);

   useEffect(() => {
      if (userData && userData.token) {
         messenger.connect(userData.token);
      }
   }, [userData])

   return (
       <div className="App">
          <SideBar
              list={chatBarList}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
          />
          <div>
             <div>
                Messenger
             </div>
             <div className="message_container">
                <div className="message_container_list">
                   {
                       activeTab &&
                       chatBarList.find((item) => {
                          return item.type === activeTab.type && +item[item.type].id === +activeTab.id
                       }).messages.map(message => {
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
