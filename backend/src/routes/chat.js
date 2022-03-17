const router = require("express").Router()

const {
    listarChat,
    escribirMensaje,
    verMensajesPrivados,
    verMensajesPrivadosDelUsuario,
    escribirMensajePrivado,
} = require ('../controllers/chatController')

const {isAdmin, isRegister} = require("../middleware/middleware");

router.get("/", isRegister, listarChat); 
router.get("/private", isRegister, verMensajesPrivados);
router.get("/:email", isAdmin, verMensajesPrivadosDelUsuario);
router.post("/", isRegister, escribirMensaje);
router.post("/private", isRegister, escribirMensajePrivado);

module.exports = router;