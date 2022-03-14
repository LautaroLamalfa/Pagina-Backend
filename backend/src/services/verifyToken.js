const jwt = require("jsonwebtoken")
require("dotenv").config()

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    if (authHeader) {
        const token =authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) res.status(403).json("Token no es valido");
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("No estas Autenticado")
    }
}

const authorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
           next() 
        } else {
            res.status(403).json("No tenes permiso para hacerlo")
        } 
    })
}

const admin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
           next() 
        } else {
            res.status(403).json("No tenes permiso para hacerlo")
        } 
    })
}


module.exports = { authorization, admin, verifyToken }