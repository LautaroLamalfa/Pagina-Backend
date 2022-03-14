const { Schema, model } = require('mongoose');

const carritoSchema = new Schema({
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
}, {timestamps: true}
);

const Carrito = model('carrito', carritoSchema)

module.exports = Carrito