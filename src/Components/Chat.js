import React, { useCallback, useEffect, useState } from "react";
import io from 'socket.io-client';
import useMessengerSocket from '../hooks/useMessengerSocket';

const events = {
    send_message: 'send_message',
    receive_msg: 'receive_msg',
    sync_msg: 'sync_msg',
    join_room: 'join_room',
    sync_user_info: 'sync_user_info'
};

function Chat({ userData }) {
    const onSync = useCallback((data) => {
        console.log(data);
    }, []);

    const [socket] = useMessengerSocket({
        token: userData.token,
        onSync
    });

    return (
        <div className="App">
            <div>
                Messanger for
            </div>
            {/*<div>*/}
            {/*    username: {user.username || '-'}*/}
            {/*</div>*/}

            <div className="message_container">
                {/*{*/}
                {/*    messagesList.map(({ id, message }, index) => {*/}
                {/*        return <span key={id} className="message_row">*/}
                {/*                <span> sender: {id} :=> </span>*/}
                {/*                <span> {message} </span>*/}
                {/*            </span>*/}
                {/*    })*/}
                {/*}*/}
            </div>

            <div className="interaction_container">
                <div className="interaction_container_row">
                    <input
                        type="text"
                        name="message"
                        placeholder="Message"
                        // value={currentMessage}
                        // onChange={onChange}
                        // onKeyDown={onSubmit}
                    />

                    <button name='message'>
                        Send
                    </button>
                </div>

                <div className="interaction_container_row">
                    <input
                        type="text"
                        name="room"
                        placeholder="Room"
                        // value={currentRoom}
                        // onChange={onChange}
                        // onKeyDown={onSubmit}
                    />

                    <button name='room'>
                        Join
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
