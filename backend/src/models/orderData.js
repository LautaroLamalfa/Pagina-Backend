const ContenedorMongoDB = require('./contenedor/mongoDB');
const { Schema } = require('mongoose');
const logs = require('../logs/log4')

const logError = logs.getLogger("error");

class OrderDao extends ContenedorMongoDB {

    constructor() {
        super('ordenes', new Schema({
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
        }, {timestamps: true}))
    }

    getByUser = async(userId) =>{
        try{
            let docs = await super.leerALL();
            const ordenesUser = docs.filter((n) => n.user === userId)
            return ordenesUser;
        }
        catch(error){
            logError.error(error)
        }
    }
}


module.exports = OrderDao