const { darFecha } = require ('../shotcuts/fecha')
const ChatDao = require ('../models/chatData')
const UserDao = require ('../models/userData')
const logs = require ('../logs/log4')

let chat = new ChatDao()
let user = new UserDao()

const loggerError = logs.getLogger("error");

const idChatGral = "664fd8e0dd55c9a63c18hz95";

const getPublicChat = async () => {
    try {
      const chatGral = await chat.leerId(idChatGral);
      return chatGral;
    } catch (error) {
      loggerError.error(error);
    }
  };

const postPublicMsg = async (msg, tipo, email) => {
    try {
        const chatGral = await chat.leerId(idChatGral);

        const newMessage = {
        timestamp: darFecha(),
        author: email,
        body: msg,
        tipo,
        };
        chatGral.messages.push(newMessage);
        await chat.actualizar(chatGral);
        return chatGral.messages;
    } catch (error) {
        loggerError.error(error);
    }
};

const getChatByEmail = async (email) => {
    try {
      const chatGral = await chat.leerId(idChatGral);
      const msgArray = chatGral.messages;
      const msgGral = msgArray.filter((element) => {
        if (element.author === email) {
          return element;
        }
      });
      return msgGral;
    } catch (error) {
      loggerError.error(error);
    }
  };

const getPrivateChatByUser = async (isAdmin,
    idChat = "",
    email = "" ) => {
    try {
      let chat = "";
      if (isAdmin) {
        const oneUser = await user.getByUser(email);
        chat = oneUser.chat
      } else {
        chat = idChat;
      }
      const chatUser = await chat.leerId(chat);
      return chatUser;
    } catch (error) {
      loggerError.error(error);
    }
};

const postPrivateMessage = async (msg, isAdmin, email,
    idChat = "",
    emailUser = "") => {
    try {
      let chat;
      let tipo;
      if (isAdmin) {
        const oneUser = user.getByUser(emailUser);
        chat =  oneUser.chat;
        tipo = "sistema";
      } else {
        chat = idChat;
        tipo = "usuario";
      }
      const chatUser = await chat.leerId(chat);
  
      const newMessage = {
        timestamp: darFecha(),
        author: `${email}`,
        body: msg,
        tipo,
      };
      chatUser.messages.push(newMessage);
      await chat.actualizar(chatUser);
      return chatUser;
    } catch (error) {
      loggerError.error(error);
    }
  };

module.exports = {
    getPublicChat,
    postPublicMsg,
    getChatByEmail,
    getPrivateChatByUser,
    postPrivateMessage,
};