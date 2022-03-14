const router = require("express").Router()

const {
    
    getAllCarts,
    getOneFromCart,
    newCart,
    updateCart,
    deleteCart
    
} = require ("../services/cartServices")

const {verifyToken, admin, authorization } = require ("../services/verifyToken")

router.get("/:id", authorization, getOneFromCart)
router.get("/", admin, getAllCarts)
router.post("/", verifyToken, newCart)
router.put("/:id", authorization, updateCart)
router.delete("/:id", authorization, deleteCart)

module.exports = router