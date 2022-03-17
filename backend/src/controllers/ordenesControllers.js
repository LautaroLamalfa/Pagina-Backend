const {
    getAllOrders,
    getOrdersFromUser,
    newOrder,
    updateOrder,
    deleteOrder
} = require ('../services/orderServices')

const logs = require("../logs/log4");
const logError = logs.getLogger("error");

const crearOrden = async (req, res) => {
    try {
      const { cartId } = req.params;
      const userId = req.userId.id;
      const email = req.user.email
      let dir = ''
      if (req.body.direccion) {
        dir = req.body.direccion
      } else {
        res.status(400)
        res.send({ error: `La direccion es obligatoria` });
        return
      }
  
      const response = await newOrder(cartId, userId, dir, email);
      if (response.estado === "ok") {
        res.status(201)
        res.send(response.order);
      } else if (response.estado === "carritoFalse") {
        res.status(400);
        res.send({ error: `Carrito con ID ${cartId} no existe` });
      } else if (response.estado === "stockFalse"){
        res.status(400)
        res.send({ error: `Sin stock suficiente del producto ${response.producto.nombre}` });
      }
    } catch (error) {
      logError.error(error);
    }
};

const verOrdenes =  async (req,res) => {
    try {
      const response = await getOrdersFromUser(req.user.id)
      res.status(200)
      res.send(response)
    } catch (error) {
      logError.error(error);
    }
};

const verTodasLasOrdenes = async (req, res) => {
    try {
      const response = await getAllOrders();
      res.status(200)
      res.send(response);
    } catch (error) {
      logError.error(error);
    }
};

const actualizarOrden = async (req, res) => {
    try {
      const orderId = req.params.orderId
      const {productos, estado, direccion} = req.body
      const ordenMod = {
        id : orderId,
        productos,
        estado,
        direccion
      }
      const response = await updateOrder(orderId, ordenMod)
      if (response.estado === "ok") {
        res.status(201)
        res.send(response.order);
      } else if (response.estado === "ordenFalse") {
        res.status(400);
        res.send({ error: `Orden con ID ${orderId} no existe` });
      }
    } catch (error) {
      logError.error(error);
    }
};

const eliminarOrden = async (req,res) =>{
    try {
      const orderId = req.params.orderId
      const response = await deleteOrder(orderId)
      if (response.estado === "ok") {
        res.status(200)
        res.send(response.orders);
      } else if (response.estado === "ordenFalse") {
        res.status(400);
        res.send({ error: `La orden con el ID ${orderId} no existe` });
      }
    } catch (error) {
      logError.error(error);
    }
}

module.exports = {
    crearOrden,
    verOrdenes,
    verTodasLasOrdenes,
    actualizarOrden,
    eliminarOrden
}