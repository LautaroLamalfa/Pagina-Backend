const router = require("express").Router()
const { 

    getAllProducts, 
    getOneProduct,
    newProduct,
    updateProduct,
    deleteProduct

} = require("../services/productsServices")

const { admin } = require ("../services/verifyToken")

router.get("/", getAllProducts)
router.get("/:id", getOneProduct)
router.post("/", admin, newProduct)
router.put("/:id", admin, updateProduct)
router.delete("/:id", admin, deleteProduct)


module.exports = router