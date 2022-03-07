require("dotenv").config()

const mongoose = require("mongoose")

const connectDB = () => {
    try {
        mongoose.connect(process.env.MONGODB, {
            useNewUrlParser:true,
            useUnifiedTopology:true
        });

        console.log("DB conectada, que bien!");
    } catch (error) {
        console.log("DB no conectada, que mal");
        process.exit(1)
    }
}


module.exports = connectDB

