import io from "socket.io-client";
import dotenv from 'dotenv';
dotenv.config();

class Messenger {
    events = {
        send: 'send',
        sync_all: 'sync_all'
    };

    constructor(token) {
        this.socket = io(`${process.env.REACT_APP_SOCKET_URL}/message`, { auth:  { token } });

        this.socket.on('connect', () => {
            console.log('socket connected');
        });

        this.socket.on('connect_error', err => {
            console.log(err)
        });
        this.socket.on('connect_failed', err => {
            console.log(err)
        });
        this.socket.on('disconnect', err => {
            console.log(err)
        });

        this.socket.on('sync', data => {
            debugger;
            console.log(data)
        });
    }

    send(data) {
        this.socket.emit(this.events.send, {
            receiverId: data.receiverId,
            receiverType: data.receiverType,
            msg: data.msg
        });
    }

    bind(event, callback) {
        this.socket.on(this.events[event], callback);
    };
}

export default Messenger;
