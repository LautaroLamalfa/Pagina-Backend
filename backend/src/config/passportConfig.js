const bcrypt = require('bcrypt')
const saltRounds = 10;

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const fs = require("fs");
const logs = require('../logs/log4')
const nodemailerConfig = require("../config/nodemailerConfig");
const ENV = require("../config/enviromentConfig");
const {darFecha} = require("../shotcuts/fecha");

const CartDao = require("../models/cartData");
const UsersDao = require('../models/userData');
const ChatDao = require('../models/chatData');

let cart = new CartDao()
let user = new UsersDao()
let chat = new ChatDao()

const logConsola = logs.getLogger("consola");

passport.use(
    "local-signup",
    new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
        async (req, username, password, done) => {
            let newUser = await user.getByUser(username)
            const hash = bcrypt.hashSync(password, saltRounds);
            let avatar = undefined;
            if (user) {
                logConsola.warn("El usuario ya existe");
                return done(null, false);
            }
            
        if (req.file) {
        fs.renameSync(
            req.file.path,
            req.file.path + "." + req.file.mimetype.split("/")[1]
            );
            avatar = req.file.filename + "." + req.file.mimetype.split("/")[1];
        }
        let { nombre, apellido, direccion, telefono, passwordRepeat } = req.body;

        if (password != passwordRepeat) {
            loggerConsola.warn("Los passwords no coinciden");
            return done(null, false);
          }

        let carrito = { timestamp: darFecha(), productos: [] };
        let aux = await cart.guardar(carrito);
        carrito = aux.id;
        let newChat = { timestamp: darFecha() };
        let aux2 = await chat.guardar(chat);
        newChat = aux2.id;

        let userNew = await user.guardar({
            email: username,
            password: hash,
            nombre,
            direccion,
            carrito,
            chat,
          });

        const mailOptions = {
        from: "Servidor node.js",
        to: ENV.adminMail,
        subject: "Nuevo registro",
        html: "Datos del nuevo usuario <br>" + JSON.stringify(userNew),
        };  await nodemailerConfig.sendMail(mailOptions);

          return done(null, userNew);
        },
    )
)

passport.use(
    "local-login",
    new LocalStrategy(async (username, password, done) => {
      let logIn = await user.getByUser(username);
  
      if (logIn) {
        if (bcrypt.compareSync(password, logIn.password)) {
          return done(null, logIn);
        }
      }
      return done(null, false);
    })
  );
  
  passport.serializeUser((logIn, done) => {
    done(null, logIn.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    let logIn = await user.leerId(id);
    done(null, logIn);
  });


module.exports = passport;