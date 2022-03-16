const ContenedorMongoDB = require('./contenedor/mongoDB');
const { Schema } = require('mongoose');
const logs = require('../logs/log4')

const logError = logs.getLogger("error");


class userDao extends ContenedorMongoDB {

    constructor() {
        super('usuarios', new Schema({
            nombre:{ 
                type: String,
                required: true,
                unique: true
            },
            email:{
                type: String,
                required: true,
                unique: true
            },
            password: {
                type: String,
                required: true,
            },
            isAdmin: {
                type:Boolean,
                default: false
            },        
        },{timestamps: true}))
    }

    getByUser = async(username) =>{
        try{
            let docs = false;
            docs = await super.leerALL();
            for (const user of docs) {
                if (user.email === username){
                    return user;
                }
            }
            return false;
        }
        catch(error){
            logError.error(error)
        }
    }
}

module.exports = userDao