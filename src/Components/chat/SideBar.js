import React, {useEffect, useState} from "react";

function SideBar({chatData = [], activeTabUserId, setActiveTabUserId}) {
    // debugger;
    useEffect(() => {
        if (chatData.length) {
            setActiveTabUserId(chatData[0].user.id)
        }
    }, [chatData]);

    return (
        <div className="usersBarContainer">
            {
                chatData.map(({user}) => {
                    const isActive = activeTabUserId === user.id;
                    // debugger;
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
                       <span style={{fontSize: '15px'}}> {user.username} </span>
                    </span>
                    )
                })
            }
        </div>
    );
}

export default SideBar;
