const express = require("express")
const usersController = require("../app/controllers/usersController")
const authenticateUser = require("../app/middlewares/authenticateUser")
const authorizeUser = require("../app/middlewares/authorizeUser")
const productsController = require("../app/controllers/productsController")

const router = express.Router()

//Api for Users 
router.get("/api/users",authenticateUser, (req, res, next)=>{
    req.permittedRoles = ["admin"]
    next()
},authorizeUser, usersController.list)
router.post("/api/users/register", usersController.register)
router.post("/api/users/login", usersController.login)
router.get("/api/users/account", authenticateUser, usersController.account)
router.put("/api/users/changeRole/:id", authenticateUser, (req, res, next)=>{
    req.permittedRoles = ["admin"]
    next()
},authorizeUser,usersController.changeRole)


//APi for Products
router.get("/api/products",authenticateUser, productsController.list)

router.post("/api/products",authenticateUser, (req, res, next)=>{
    req.permittedRoles = ["admin", "moderator"]
    next()
}, authorizeUser, productsController.create)

router.delete("/api/products/destroyAll",authenticateUser, (req, res, next)=>{
    req.permittedRoles = ["admin"]
    next()
}, authorizeUser,productsController.destroyAll)

router.put("/api/products/:id",authenticateUser, (req, res, next)=>{
    req.permittedRoles = ["admin", "moderator"]
    next()
}, authorizeUser, productsController.update)

router.delete("/api/products/:id",authenticateUser, (req, res, next)=>{
    req.permittedRoles = ["admin"]
    next()
}, authorizeUser,productsController.destroy)

module.exports = router