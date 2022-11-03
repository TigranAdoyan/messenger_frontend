export class Chat {
   constructor(chats = []) {
     this.chats = chats;
   }

   getUserChat(userId) {
      return this.chats.find((chat) => chat.user.id === userId) || null;
   }

   pushMessage(message, userId) {
      return new Chat(this.chats.map(chat => {
         if (chat.user.id === userId) {
            chat.messages.push(message);
         }
         return chat;
      }));
   }
}

