const OrderDao = require('../models/orderData');
const logs = require ('../logs/log4')

const logError = logs.getLogger("error");

let order = new OrderDao()

// CREATE

const newOrder = async (req, res) => {
  try {
      const saveOrder = await order.guardar()
      res.status(200).json(saveOrder)
  } catch (error) {
      logError.error(error);
  }
}

//  GET 

const getOrdersFromUser = async (userId) => {
    try {
        const ordersUser = await order.leerId(userId);
        return ordersUser;
      } catch (error) {
        logError.error(error);
      }

}

const getAllOrders = async () => {
    try {
        const orders = order.leerALL();
        return orders;
      } catch (error) {
        loggerError.error(error);
      }
}

// UPDATE

const updateOrder = async (orderId, ordenMod) => {
    try {
        let update = await order.leerId(orderId);
        if (Object.keys(update).length != 0) {
          finalOrder = { ...ordenMod, timestamp: update.timestamp, user: update.user };
          await order.actualizar(finalOrder);
          return { order: order };
        } else {
            logError.error("oops, no hay orden")
        }
      } catch (error) {
        logError.error(error);
      }
}

// DELETE

const deleteOrder = async () => {
    try {
        let discard = await order.eliminarALL()

        return discard
    } catch (error) {
        logError.error(error);
    }
}

module.exports = {
    getAllOrders,
    getOrdersFromUser,
    newOrder,
    updateOrder,
    deleteOrder
}
