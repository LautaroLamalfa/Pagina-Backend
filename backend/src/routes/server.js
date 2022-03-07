const {Router} = require("express")
const { 

    getAllProducts, 
    getOneProduct

} = require("../controllers/productsControl")

const router = new Router()

router.get("/", getAllProducts)
router.get("/:id", getOneProduct)

module.exports = router