import io from "socket.io-client";
import dotenv from 'dotenv';

dotenv.config();

export const listenEvents = {
   'sync_app': 'server:sync_app',
   'send_message': 'server:send_message',
   'seen_message': 'server:seen_message',
   'session': 'server:session',
   'online_status_change': 'server:online_status_change',
   'typing_status_change': 'server:typing_status_change'
};

export const emitEvents = {
   'sync_app': 'client:sync_app',
   'connect_to_chat': 'client:connect_to_chat',
   'send_message': 'client:send_message',
   'seen_message': 'client:seen_message',
   'typing_status_change': 'client:typing_status_change',
};

class Messenger {
   constructor() {
      this.socket = io(`${process.env.REACT_APP_SOCKET_URL}/message`, {
         auth: {
            username: "tigran",
            token: localStorage.getItem('token')
         },
         authConnect: false,
      });

      if (this.socket.auth) {
         this.socket.connect();
         this.socket.emit(emitEvents["sync_app"]);
      }

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
      if (!this.socket.auth.token) {
         this.socket.auth.token = token;
         this.socket.connect();
         this.socket.emit(emitEvents["sync_app"]);
      }
   };

   bind(event, callback) {
      this.socket.on(event, callback);
   };

   sendMessage(data, cb) {
      this.socket.emit(emitEvents["send_message"], {
         receiverId: data.receiverId,
         receiverType: data.receiverType,
         msg: data.msg,
         tempId: data.tempId,
      }, cb);
   }

   seenMessage(data) {
      this.socket.emit(emitEvents['seen_message'], {
         senderId: data.senderId,
         messagesIds: data.messagesIds,
      })
   }

   typingStatusChange(data) {
      this.socket.emit(emitEvents['typing_status_change'], {
         status: data.status,
         receiverId: data.receiverId
      })
   }
}

export default new Messenger();
