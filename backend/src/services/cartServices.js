const Cart = require("../models/cartData")

// CREATE

const newCart = async (req, res) => {
    const newProd = new Cart(req.body)
    try {
        const savedCart = await newProd.save()
        res.status(200).json(savedCart)
    } catch (error) {
        res.status(500).json("error " + error)
    }
}

//  GET USER Cart

const getOneFromCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({userId:req.params.UserId});

        res.json(cart)
    } catch (error) {
        res.status(500).json("error " + error)
    }
}

// GET ALL

const getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find()
        res.status(200).json(carts)
    } catch (err) {
        res.status(500).json("error " + err)
    }
}

// UPDATE

const updateCart = async (req, res) => {
    try {
        const updateCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        )
        res.status(200).json(updateCart)
    } catch (error) {
        res.status(500).json("error " + error)
    }
}

// DELETE

const deleteCart = async (req, res) => {
    try {
        await Cart.findByIdAndUpdate(req.params.id)
        res.status(200).json("Producto Eliminado")
    } catch (error) {
        res.status(500).json("error " + error)
    }
}

module.exports = {
    getAllCarts,
    getOneFromCart,
    newCart,
    updateCart,
    deleteCart
}