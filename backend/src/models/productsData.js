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
    imagen:String
})

const Product = model('productos', productSchema)

module.exports = Product