const router = require("express").Router()
const passport = require("../config/passportConfig")
const {getUser} = require("../controllers/loginController")

router.get("/", getUser);

router.post("/", passport.authenticate("local-login",{
    successRedirect:"/productos.html",
    failureRedirect:"/loginError.html"

}))

module.exports = router;
