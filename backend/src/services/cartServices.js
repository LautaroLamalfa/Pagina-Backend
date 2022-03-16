const CartDao = require("../models/cartData")
const ProductosDao = require('../models/productsData')
const logs = require("../logs/log4");

const logConsola = logs.getLogger("console");
const logError = logs.getLogger("error");


let cart = new CartDao()
let prod = new ProductosDao()


const newCart = async () => {
    try {
        let carrito = {
            productos: []
        }
        let saved = await cart.guardar(carrito)
        return { id: saved.id}
    } catch (error) {
        logError.error(error)
    }
}


const checkProdFromCart = async (id) => {
    try {
        let carrito = await cart.leerId(id);
        if (carrito) {
            const prod = carrito.productos;
            return { products: prod };
          } else {
              logError.error(" oops, no hay carrito ")
          }
    } catch (error) {
        logError.error(error)
    }
}

const checkCarts = async () => {
    try {
        let prods = await cart.leerALL()
        return prods    
    } catch (error) {
        logError.error(error)
    }
}


const prodToCart = async (idProd, idCart) => {
    try {
        let proId = await prod.leerId(idProd);
        if (Object.keys(proId).length !=0) {
            let carrito = await cart.leerId(idCart)
                if (carrito) {
                    carrito.prod.push(proId)
                    cart.actualizar(carrito)
                    return { carrito: carrito }
                } else {
                    logError.error("oops, no hay carrito")
                }
        } else {
            logError.error("oops, no hay producto")
        }
    } catch (error) {
        logError.error(error)
    }
}

const deleteProdFromCart = async(idProd, idCart) => {
    try {
        let discardId = await cart.leerId(idCart)
        if (Object.keys(discardId).length !=0) {
            let products = discardId.prod
            let index = products.findIndex((aux) => aux.id == idProd)
            if (index >= 0) {
                discardId.prod.splice(index, 1)
                cart.actualizar(discardId)
                return { carrito: discardId }
            } else {
                logError.error("oops, no hay producto")
            }
        } else {
            logError.error("oops, no hay carrito")
        }
    } catch (error) {
        logError.error(error)
    }
}

const deleteCart = async () => {
    try {
        let discard = await cart.leerId(id)
        if (Object.keys(discard).length !=0) {
            await cart.eliminarALL()
            logConsola.info("Todo OK !")
        } else { 
            logError.error("oops, no hay carrito")
         }
    } catch (error) {
        logError.error(error)
    }
}

module.exports = {
    newCart,
    checkCarts,
    checkProdFromCart,
    prodToCart,
    deleteCart,
    deleteProdFromCart
}