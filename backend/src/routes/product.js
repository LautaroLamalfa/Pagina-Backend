const router = require("express").Router()

const { 
    getAllProducts,
    getOneProduct,
    getByCategory,
    newProduct,
    updateProduct,
    deleteProduct
} = require("../services/productsServices")

const { isAdmin } = require("../middleware/middleware");

router.get("/", getAllProducts)
router.get("/:id", getOneProduct)
router.get("/:category", getByCategory)
router.post("/", isAdmin, newProduct)
router.put("/:id", isAdmin, updateProduct)
router.delete("/:id", isAdmin, deleteProduct)


module.exports = router