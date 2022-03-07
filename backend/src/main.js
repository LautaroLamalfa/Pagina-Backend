const express = require("express");
const cluster = require("cluster");
const compression = require("compression");
const connectDB = require("./config/config")
const cors = require("cors")
const productsRoute = require("./routes/server") 
require("dotenv").config();
connectDB()

const app = express();

// MIDDLEWARES

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(compression())
app.use(cors())
app.use('/api', productsRoute)

const PORT = process.env.PORT || 8085

// CLUSTER
if (cluster.isMaster) {
        cluster.fork() 

    cluster.on("exit", () => {
        console.log(`Procesador ${process.pid} 👻 R.I.P. 👻`);
    })
}  else {

    app.get("/", (req, res) => {
        if (process.env.NODE_ENV === "PR") {
            res.send(`Hola a todos ${process.pid}`)
        }
    });

    app.listen(process.env.PORT, () => {
        console.log(`Servidor ${process.pid}, Host ${process.env.HOST} http://localhost:${PORT}`);
    })
}
