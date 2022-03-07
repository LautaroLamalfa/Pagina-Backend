const Product = require("../models/productsData")

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});

        res.json(products)
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "No se pudo conseguir todos los productos"})
    }
}

const getOneProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        res.json(product)
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "No se pudo conseguir el producto"})
    }
}

module.exports = {
    getAllProducts,
    getOneProduct
}