import React, {useCallback, useEffect, useRef, useState} from "react";
import Messenger from "../services/messenger";

const defaultMessage = {
    receiverId: '',
    receiverType: '',
    msg: ''
};

function Chat({ userData }) {
    const [messageForm, setMessageForm] = useState(defaultMessage);

    const onSync_SOCKET = useCallback((data) => {
        console.log(data);
    }, []);

    const { current: messenger } = useRef(new Messenger(userData.token));

    useEffect(() => {
        messenger.bind(messenger.events.sync_all, onSync_SOCKET)
    }, []);

    const onChange = useCallback((e) => {
        setMessageForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }, []);

    const onSend = () => {
        messenger.send(messageForm)
    };

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
                        name="msg"
                        placeholder="Message"
                        value={messageForm.msg}
                        onChange={onChange}
                    />
                </div>

                <div className="interaction_container_row">
                    <input
                        type="text"
                        name="receiverId"
                        placeholder="Receiver Id"
                        value={messageForm.receiverId}
                        onChange={onChange}
                    />
                </div>
                {/*<div className="interaction_container_row">*/}
                {/*    <input*/}
                {/*        type="text"*/}
                {/*        name="room"*/}
                {/*        placeholder="Room"*/}
                {/*        // value={currentRoom}*/}
                {/*        // onChange={onChange}*/}
                {/*        // onKeyDown={onSubmit}*/}
                {/*    />*/}

                {/*    <button name='room'>*/}
                {/*        Join*/}
                {/*    </button>*/}
                {/*</div>*/}

                <button name='message' onClick={onSend}>
                    Send
                </button>
            </div>
        </div>
    );
}

export default Chat;
