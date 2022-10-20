import React, { useEffect, useMemo } from 'react';
import io from "socket.io-client";
import dotenv from 'dotenv';
dotenv.config();

const events = {
    send_message: 'send_message',
    receive_msg: 'receive_msg',
    sync_msg: 'sync_msg',
    join_room: 'join_room',
    sync_user_info: 'sync_user_info'
};

function useMessengerSocket(props) {
    const { token, onSync } = props;

    const socket = useMemo(() => {
        return io(`${process.env.REACT_APP_SOCKET_URL}/message`, { auth:  { token } });
    }, []);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('socket connected');
        });

        socket.on('connect_error', err => {
            console.log(err)
        });
        socket.on('connect_failed', err => {
            console.log(err)
        });
        socket.on('disconnect', err => {
            console.log(err)
        });

        socket.on(events.sync_msg, onSync);

        return () => {
            socket.off(events.sync_msg, onSync)
        }
    }, []);

    return [socket]
}

export default useMessengerSocket;