const express = require("express");
const compression = require("compression");
const cors = require("cors")
const mongoose = require("mongoose")
const productsRoute = require("./routes/product")
const register = require("./routes/user")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")
require("dotenv").config();

const PORT = process.env.PORT || 8085

mongoose.connect(
    process.env.MONGODB, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(() => console.log("DB conectada, que bien!"))
      .catch((Error) => (console.error("DB no conectada, que mal" + Error)
));
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(compression())
app.use(cors())
app.use('/api', productsRoute)
app.use('/auth', register)
app.use('/api/cart', cartRoute)
app.use('/api/order', orderRoute)

app.get("/", (req, res) => {
    res.send("Hola Servidor " + process.pid);    
})

app.listen(PORT, () => {
    console.log(`Servidor ${process.pid}, Host ${process.env.HOST} http://localhost:${PORT}`);
})




