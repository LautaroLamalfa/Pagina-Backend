const router = require("express").Router()

const {
    
    getAllOrders,
    getOrdersFromUser,
    newOrder,
    updateOrder,
    deleteOrder
    
} = require ("../services/orderServices")

const {verifyToken, admin, authorization } = require ("../services/verifyToken")

router.get("/:id", authorization, getOrdersFromUser)
router.get("/", admin, getAllOrders)
router.post("/", verifyToken, newOrder)
router.put("/:id", admin, updateOrder)
router.delete("/:id", admin, deleteOrder)

module.exports = router