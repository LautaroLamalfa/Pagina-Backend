const ContenedorMongoDB = require ('./contenedor/mongoDB')
const { Schema } = require('mongoose');

class ChatDao extends ContenedorMongoDB {

    constructor() {
        super('chats', new Schema({
            timestamp: {
                type: String, 
                required: true
            },
            messages : {
                type: Array, 
                required: true, 
                default:[]
            }
        },{timestamps: true}));
    }
}

module.exports = ChatDao
