const router = require ("express").Router()
const passport = require("../config/passportConfig")

router.post("/", passport.authenticate("local-signup",{
    successRedirect:"/",
    failureRedirect:"/registerError.html"
}))

module.exports = router