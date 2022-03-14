const Product = require("../models/productsData")

// GET ALL

const getAllProducts = async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category; 
    try {
        let products;

        if (qNew) {
            products = await Product.find().sort({createdAt: -1}).limit(5)
        } else if(qCategory){
            products = await Product.find({categorías: {
                $in: [qCategory],
            },
        });
    
        } else {
            products = await Product.find()
        }

        res.status(200).json(products)
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "No se pudo conseguir todos los productos"})
    }
}

// GET ONE

const getOneProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        res.json(product)
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "No se pudo conseguir el producto"})
    }
}

// CREATE

const newProduct = async (req, res) => {
    const newProd = new Product(req.body)
    try {
        const savedProduct = await newProd.save()
        res.status(200).json(savedProduct)
    } catch (error) {
        res.status(500).json({message: "No se pudo crear el producto"})
    }
}

// UPDATE

const updateProduct = async (req, res) => {
    try {
        const updateProd = await Product.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        )
        res.status(200).json(updateProd)
    } catch (error) {
        res.status(500).json({message: "No se pudo actualizar el producto"})
    }
}

const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id)
        res.status(200).json("Producto Eliminado")
    } catch (error) {
        res.status(500).json({message: "No se pudo eliminar el producto"})
    }
}

module.exports = {
    getAllProducts,
    getOneProduct,
    newProduct,
    updateProduct,
    deleteProduct
}