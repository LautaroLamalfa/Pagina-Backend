const { Schema, model } = require('mongoose');

const userSchema = new Schema({
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
}, {timestamps: true}
);

const User = model('usuarios', userSchema)

module.exports = User