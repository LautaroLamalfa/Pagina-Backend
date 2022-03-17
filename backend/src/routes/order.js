const router = require("express").Router()

const {
    getAllOrders,
    getOrdersFromUser,
    newOrder,
    updateOrder,
    deleteOrder 
} = require ("../services/orderServices")

const {isAdmin, isRegister} = require("../middleware/middleware");

router.get("/", isRegister, getOrdersFromUser)
router.get("/all", isAdmin, getAllOrders)
router.post("/:cartId", isRegister, newOrder)
router.put("/:orderId", isAdmin, updateOrder)
router.delete("/:orderId", isAdmin, deleteOrder)

module.exports = router