const { Schema, model } = require('mongoose');

const ordenSchema = new Schema({
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
    ],
    total: {
        type: Number,
        required: true
    },
    direccion: {
        type: Object,
        required: true,
    },
    status: {
        type: String,
        default: "pending"
    },
}, {timestamps: true}
);

const Orden = model('orden', ordenSchema)

module.exports = Orden