const router = require("express").Router()

const {
    crearCarrito,
    listarProductos,
    listarCarritos,
    agregarProducto,
    eliminarProductoDeCarrito,
    eliminarCarrito
} = require ("../controllers/cartController")

const {isAdmin, isRegister} = require("../middleware/middleware");

router.get("/", isAdmin, listarCarritos)
router.get("/:id", isRegister, listarProductos)
router.post("/", isRegister, crearCarrito)
router.post("/:cartId/:prodId", isRegister, agregarProducto)
router.delete("/:id", isRegister, eliminarCarrito)
router.delete("/:cartId/:prodId", isRegister, eliminarProductoDeCarrito)

module.exports = router