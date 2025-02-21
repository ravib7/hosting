const { register, login, logout, getUsers } = require("../controller/auth.controller")
const { privateRoute } = require("../middlewares/protected")

const router = require("express").Router()

router
    .post("/register", register)
    .post("/login", login)
    .post("/logout", logout)
    .get("/users", privateRoute, getUsers)

module.exports = router