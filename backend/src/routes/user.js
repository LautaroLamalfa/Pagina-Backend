const router = require ("express").Router()
const User = require ("../models/userData")
const CryptoJs = require ("crypto-js")
const jwt = require ("jsonwebtoken")
require("dotenv").config();

const { authorization, admin } = require ("../services/verifyToken")

// GET USER 

router.get("/find/:id", admin, async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...otros } = user._doc;
        res.status(200).json(otros)
    } catch (error) {
        res.status(500).json("error "+ error)
    }
})

// GET ALL 

router.get("/find", admin, async(req, res) => {
    const query = req.query.new
    try {
        const users = query 
            ? await User.find().sort({_id:-1}).limit(1) 
            : await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json("error "+ error)
    }
})

// REGISTER

router.post("/register", async (req,res) => {
    const newUser = new User({
        nombre: req.body.nombre,
        email: req.body.email,
        password: CryptoJs.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString(),
    });

    try {
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)        
    } catch (error) {
        res.status(500).json("error " + error)
    }
})

// LOGIN

router.post("/login", async(req,res) => {
    try {
        const user = await User.findOne({nombre: req.body.nombre})
        !user && res.status(401).json("Datos Erroneos")

        const hashPass = CryptoJs.AES.decrypt(user.password, process.env.PASS_SECRET);
        
        const Actualpassword = hashPass.toString(CryptoJs.enc.Utf8)

        Actualpassword !==req.body.password && 
            res.status(401).json("Datos Erroneos")

            const accessToken = jwt.sign({
                id:user._id, 
                isAdmin: user.isAdmin,
            }, 
            process.env.JWT_SECRET,
            {expiresIn: "3d"}
            );

        const { password, ...otros } = user._doc

        res.status(200).json({...otros, accessToken})

    } catch (error) {
        res.status(500).json("error " + error)
    }
})

// UPDATE

router.put("/:id", authorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJs.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString()
    }
    
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new:true})

        res.status(200).json(updateUser);
    } catch (error) {
        res.status(500).json("error " + error)
    }
})

// DELETE

router.delete("/:id", authorization, async(req, res) => {
    try {
        await User.findOneAndDelete(req.params.id)
        res.status(200).json("Usuario Eliminado")
    } catch (error) {
        res.status(500).json("error "+ error)
    }
})

module.exports = router