import React, {useEffect, useState} from "react";

function SideBar({chats = [], activeTabUserId, setActiveTabUserId}) {
    useEffect(() => {
        if (chats.length) {
            setActiveTabUserId(chats[0].user.id)
        }
    }, [chats]);

    return (
        <div className="usersBarContainer">
            {
                chats.map(({user}) => {
                    const isActive = activeTabUserId === user.id;
                    const className = `usersBarContainer_item ${isActive ? 'usersBarContainer_item_active' : ''}`;

                    return (
                        <span
                            key={user.id}
                            className={className}
                            onClick={() => {
                                if (!isActive) {
                                    setActiveTabUserId(user.id)
                                }
                            }
                            }
                        >
                       <span style={{fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                           <span> {user.username} </span>
                           {
                               user.isOnline ? <div className="online_status_dot" ></div> : <div className="offline_status_dot" ></div>
                           }
                       </span>
                    </span>
                    )
                })
            }
        </div>
    );
}

export default SideBar;
