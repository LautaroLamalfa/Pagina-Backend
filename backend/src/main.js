const express = require("express");
const cluster = require("cluster")
const compression = require("compression");
const connectDB = require("./config/config")
const cors = require("cors")
const productsRoute = require("./routes/server")
require("dotenv").config();
connectDB()

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(compression())
app.use(cors())
app.use('/api', productsRoute)

const PORT = parseInt(process.argv[2]) || 8085
const modoCLuster = process.argv[3] == "CLUSTER"

if (modoCLuster && cluster.isPrimary) {

    cluster.fork()

    cluster.on('exit', Worker => {
        console.log('Worker', Worker.process.pid, 'died');
        cluster.fork()
    })
} else {
    app.get("/", (req, res) => {
        if (process.env.NODE_ENV === "PR") {
            res.send(`Hola a todos ${process.pid}`)

            console.log(req.headers)
        }
    });

    app.listen(PORT, () => {
        console.log(`Servidor ${process.pid}, Host ${process.env.HOST} http://localhost:${PORT}`);
    })

}



