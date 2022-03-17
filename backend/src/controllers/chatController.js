const {
    getPublicChat,
    postPublicMsg,
    getChatByEmail,
    getPrivateChatByUser,
    postPrivateMessage,
} = require ('../services/chatServices')

const logs = require ('../logs/log4')
const logError = logs.getLogger("error");

const listarChat = async (req, res) => {
    try {
      const response = await getPublicChat();
      res.status(200).send(response);
    } catch (error) {
      logError.error(error);
    }
}; 

const escribirMensaje = async (req, res) => {
    try {
      const email = req.user.email;
      const msg = req.body.msg;
      let tipo;
      if (req.user.isAdmin) {
        tipo = "sistema";
      } else {
        tipo = "usuario";
      }
  
      const response = await postPublicMsg(msg, tipo, email);
      res.status(201).send(response);
    } catch (error) {
      logError.error(error);
      throw Error("Error en postPublicMsg chatController");
    }
};

const verMensajesPrivados = async (req, res) => {
    try {
      const email = req.params.email;
      const response = await getChatByEmail(email);
      res.status(200).send(response);
    } catch (error) {
      logError.error(error);
      throw Error("Error en getChatByEmail chatController");
    }
  };

const verMensajesPrivadosDelUsuario = async (req, res) => {
    try {
      if (!req.user) {
        return false;
      }
  
      let idChat = "";
      let isAdmin = "";
      let email = "";
      if (req.user.isAdmin) {
        isAdmin = true;
        email = req.query.email;
      } else {
        isAdmin = false;
        idChat = req.user.chat;
      }
      const response = await getPrivateChatByUser(isAdmin, idChat, email);
      res.status(200).send(response);
    } catch (error) {
      logError.error(error);
    }
};

const escribirMensajePrivado = async (req, res) => {
    try {
      const msg = req.body.msg;
      const email = req.user.email;
      let isAdmin = false;
      let idChat;
      let emailUser;
  
      if (req.user.isAdmin) {
        isAdmin = true;
        emailUser = req.query.email;
      } else {
        idChat = req.user.chat;
      }
  
      const response = await postPrivateMessage(
        msg,
        isAdmin,
        email,
        idChat,
        emailUser
      );
      res.status(201).send(response);
    } catch (error) {
      logError.error(error);
      throw Error("Error en postPrivateMessage chatController");
    }
};



module.exports = {
    listarChat,
    escribirMensaje,
    verMensajesPrivados,
    verMensajesPrivadosDelUsuario,
    escribirMensajePrivado,
}