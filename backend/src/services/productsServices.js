const ProductosDao = require('../models/productsData');
const logs = require ('../logs/log4')

const logError = logs.getLogger("error");

let prod = new ProductosDao()

// GET ALL

const getAllProducts = async () => {
    try {
        const response = await prod.leerALL();
        return response;
      } catch (error) {
        logError.error(error);
      }
}

// GET ONE

const getOneProduct = async (id) => {
    try {
        const prodId = await prod.leerId(id);
        if (Object.keys(prodId).length != 0) {
          return {producto: prodId };
        } else {
          logError.error(" no hay productos")
        }
      } catch (error) {
        logError.error(error);
      }
}

// CREATE

const newProduct = async (newProd) => {
    try {
        const addProd = await prod.guardar(newProd);
        return addProd;        
    } catch (error) {
        logError.error(error);
    }
}

// UPDATE

const updateProduct = async (id, prodMod) => {
    try {
        let flag = await prod.leerId(id);
        if (Object.keys(flag).length != 0) {
          const pto = await prod.actualizar(prodMod);
          return { producto: pto };
        } else {
            logError.error(" oops, no existe producto ")
        }
    } catch (error) {
        logError.error(error);
    }
}

const deleteProduct = async (id) => {
    try {
        let discard = await prod.leerId(id);
    
        if (Object.keys(discard).length != 0) {
          await prod.eliminarId(id);
          const prodsAll = await prod.leerALL();
          return { productos: prodsAll };
        } else {
          return { estado: "ptoFalse" };
        }
      } catch (error) {
        logError.error(error);
      }
    
}

module.exports = {
    getAllProducts,
    getOneProduct,
    newProduct,
    updateProduct,
    deleteProduct
}