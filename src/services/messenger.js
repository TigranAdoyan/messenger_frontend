import io from "socket.io-client";
import dotenv from 'dotenv';

dotenv.config();

export const listenEvents = {
   'sync_app': 'server:sync_app',
   'send_message': 'server:send_message',
   'session': 'server:session',
};

export const emitEvents = {
   'sync_app': 'client:sync_app',
   'connect_to_chat': 'client:connect_to_chat',
   'send_message': 'client:send_message',
};

class Messenger {
   constructor() {
      this.socket = io(`${process.env.REACT_APP_SOCKET_URL}/message`, {
         auth: {
            username: "tigran"
         },
         authConnect: false,
      });

      this.socket.emit(emitEvents["sync_app"]);

      this.socket.emit(emitEvents["connect_to_chat"]);

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

      this.socket.on(listenEvents["session"], (data) => {
         this.socket.auth.sessionID = data.sessionID;
         this.socket.auth.userID = data.userID;
         this.socket.connect();
      });
   }

   connect(token) {
      this.socket.auth.token = token;
      this.socket.connect();
   };

   bind(event, callback) {
      this.socket.on(event, (data) => {
         debugger;
         callback(data)
      });
   };

   sendMessage(data) {
      this.socket.emit(emitEvents["send_message"], {
         receiverId: data.receiverId,
         receiverType: data.receiverType,
         msg: data.msg
      });
   }
}

export default new Messenger();
