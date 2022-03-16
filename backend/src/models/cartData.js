const ContenedorMongoDB = require ('./contenedor/mongoDB')
const { Schema } = require('mongoose');

class CartDao extends ContenedorMongoDB {
    
    constructor() {
    super('carrito', new Schema({
        userId:{ 
            type: String,
            required: true
        },
        productos: [
            {
                productId: {
                    type: String,
                },
                cantidad: {
                    type: Number,
                    default: 1,
                }
            }
        ]   
    }, {timestamps: true}))
    }
}


module.exports = CartDao