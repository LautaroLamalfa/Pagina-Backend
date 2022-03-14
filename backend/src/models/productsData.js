const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    nombre:{ 
        type: String,
        required:true,
    },
    precio:{
        type:Number,
        default:0
    },
    imagen:String,
    descripción: {
        type: String,
        required: true
    },
    categorías: { type: Array}
    
})

const Product = model('productos', productSchema)

module.exports = Product