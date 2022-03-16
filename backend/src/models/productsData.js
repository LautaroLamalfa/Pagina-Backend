const ContenedorMongoDB = require('./contenedor/mongoDB');
const { Schema } = require('mongoose');
const logs = require('../logs/log4')

const logError = logs.getLogger("error");

class ProductsDao extends ContenedorMongoDB {

    constructor() {
        super ('productos', new Schema({
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
        }, {timestamps: true} ))
    }

    getByCategory = async (categorías) =>{
        try{
            let docs = await super.leerALL();
            const prodCategory = docs.filter((n) => n.categoria === categorías)
            return prodCategory;
        }
        catch(error){
            logError.error(error)
        }
    }
}

module.exports = ProductsDao
