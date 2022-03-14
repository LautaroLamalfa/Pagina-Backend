const Compra = require("../models/orderData")

// CREATE

const newOrder = async (req, res) => {
    const newOrder = new Compra(req.body)
    try {
        const saveOrder = await newOrder.save()
        res.status(200).json(saveOrder)
    } catch (error) {
        res.status(500).json("error " + error)
    }
}

//  GET 

const getOrdersFromUser = async (req, res) => {
    try {
        const order = await Compra.find({userId:req.params.UserId});

        res.json(order)
    } catch (error) {
        console.error(error);
        res.status(500).json("error " + error)
    }
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await Compra.find()
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json("error " + err)
    }
}

// UPDATE

const updateOrder = async (req, res) => {
    try {
        const updateOrder = await Compra.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        )
        res.status(200).json(updateOrder)
    } catch (error) {
        res.status(500).json("error " + error)
    }
}

// DELETE

const deleteOrder = async (req, res) => {
    try {
        await Compra.findByIdAndUpdate(req.params.id)
        res.status(200).json("Producto Eliminado")
    } catch (error) {
        res.status(500).json("error " + error)
    }
}

module.exports = {
    getAllOrders,
    getOrdersFromUser,
    newOrder,
    updateOrder,
    deleteOrder,
}