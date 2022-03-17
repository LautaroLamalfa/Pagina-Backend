const express = require("express");
const session = require("express-session");
const compression = require("compression");
const ENV = require("./config/enviromentConfig")
const logs = require ("./logs/log4.js")
const {isRegister} = require("./middleware/middleware");
const passport = require("passport");
const productsRoute = require("./routes/product")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")
const chatRoute = require("./routes/chat")
const login = require("./src/routes/login");
const logout = require("./src/routes/logout");
const register = require("./routes/register");
require("dotenv").config();

const logConsola = logs.getLogger("console");
const logError = logs.getLogger("error");

const app = express();
const PORT = process.env.PORT || ENV.port

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/views"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(compression())
app.use('/api', productsRoute)
app.use("/login", login);
app.use('/auth', register);
app.use("/logout", logout);
app.use('/api/cart', cartRoute);
app.use('/api/chat', chatRoute);
app.use('/api/order', orderRoute);

app.use(
    session({
      cookie: { maxAge: ENV.session_time },
      secret: "backEnd",
      resave: false,
      saveUninitialized: false,
      rolling: true,
    })
  );

app.use(passport.initialize());
app.use(passport.session());
  
app.use("/", isRegister, (req, res) => {
    res.status(301).redirect("/")
})

app.use((req, res) => {
    res.status(404);
    res.send({
        error: -2,
        descripcion: `ruta ${req.originalUrl} metodo ${req.method} no implementada`,
    });
});

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", (socket) => {
    socket.emit("render", "");
    socket.emit("renderchat", "");
    socket.on("actualizacion", () => {
      socket.emit("render", "");
    });
    socket.on("chat", () => {
      io.sockets.emit("renderchat", "");
    });
  });


server.listen(PORT, () => {
    logConsola.info(`Servidor ${process.pid}, Host ${process.env.HOST} http://localhost:${PORT}`);
}); server.on("error", (error) => logError.error(`Error en servidor ${error}`))




