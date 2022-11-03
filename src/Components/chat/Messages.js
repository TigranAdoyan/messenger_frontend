import React, {useEffect, useRef} from "react";
import {ReactComponent as CheckIcon} from '../../assests/check.svg';

export default function Messages({activeTabUserId, chats, profileData, message}) {
   const messagesElement = useRef();

   useEffect(() => {
      if (messagesElement.current) {
         messagesElement.current.scrollTop = messagesElement.current.scrollHeight;
      }
   }, [chats, message, activeTabUserId]);

   return (
       <div className="message_container_list" ref={messagesElement}>
          {
              activeTabUserId &&
              chats.find(({user}) => user.id === activeTabUserId).messages.map(message => {
                 const itemClassname = `message_container_item_${+message.senderId === profileData.id ? 'right' : 'left'}`;
                 return (
                     <div className={itemClassname} key={message._id}>
                                  <span className="message_container_item_inner">
                                      {message.content.text}
                                  </span>
                        {
                            +message.receiverId !== +profileData.id && (
                                <span style={{
                                   fontSize: '8px',
                                   display: 'flex',
                                   alignItems: 'center',
                                   padding: '0px 5px',
                                }}> {
                                   message.pending ?
                                       <CheckIcon width="8px" height="8px" fill='gray'/> :
                                       [1, 2].map(() => {
                                          return <CheckIcon width="8px" height="8px" fill={message.seen ? 'green' : 'gray'}/>
                                       })
                                } </span>
                            )
                        }
                     </div>
                 )
              })}
       </div>
   );
}
