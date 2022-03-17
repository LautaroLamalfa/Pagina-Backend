const  {
    newCart,
    checkCarts,
    checkProdFromCart,
    prodToCart,
    deleteCart,
    deleteProdFromCart
} = require('../services/cartServices')

const logs = require ('../logs/log4')
const logError = logs.getLogger("error");

const crearCarrito = async (req, res) => {
    try {
      let idCarrito = await newCart();
      res.status(201)
      res.send(idCarrito);
    } catch (error) {
      logError.error(error);
    }
};

const listarProductos = async (req, res) => {
    try {
      const { id } = req.params;
      const response = await checkProdFromCart(id);
  
      if (response.estado === "ok") {
        res.status(200)
        res.send(response.products);
      } else if (response.estado === "carritoFalse") {
        res.status(400);
        res.send({ error: `Carrito con ID ${id} no existe` });
      }
    } catch (error) {
      logError.error(error);
    }
}; 

const listarCarritos = async (req, res) => {
    try {
      const response = await checkCarts();
      res.status(200)
      res.send(response);
    } catch (error) {
      logError.error(error);
      throw Error("Error en getCarritos carritoController");
    }
  }; 

const agregarProducto = async (req, res) => {
    try {
      const { prodId, cartId } = req.params;
      const response = await prodToCart(prodId, cartId);
      if (response.estado === "ok") {
        res.status(201)
        res.send(response.carrito);
      } else if (response.estado === "carritoFalse") {
        res.status(400);
        res.send({ error: `Carrito con ID ${cartId} no existe` });
      } else if (response.estado === "prodFalse") {
        res.status(400);
        res.send({ error: `Producto con ID ${prodId} no existe` });
      }
    } catch (error) {
      logError.error(error);
    }
};

const eliminarProductoDeCarrito = async (req, res) => {
    try {
      const { prodId, cartId } = req.params;
      const response = await deleteProdFromCart(prodId, cartId);
      if (response.estado === "ok") {
        res.status(200)
        res.send(response.carrito);
      } else if (response.estado === "carritoFalse") {
        res.status(400);
        res.send({ error: `Carrito con ID ${cartId} no existe` });
      } else if (response.estado === "ptoFalse") {
        res.status(400);
        res.send({ error: `Producto con ID ${prodId} no existe` });
      }
    } catch (error) {
      logError.error(error);
    }
  };

const eliminarCarrito = async (req, res) => {
    try {
      const { id } = req.params;
      const response = await deleteCart(id);
      if (response.estado === "ok") {
        res.status(200)
        res.send({ message: `Carrito con ID ${id} borrado` });
      } else if (response.estado === "carritoFalse") {
        res.status(400);
        res.send({ error: `Carrito con ID ${id} no existe` });
      }
    } catch (error) {
      logError.error(error);
    }
};

module.exports = {
    crearCarrito,
    listarProductos,
    listarCarritos,
    agregarProducto,
    eliminarProductoDeCarrito,
    eliminarCarrito
}