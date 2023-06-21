const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
require("dotenv").config()

const usersController = {}

usersController.list = async (req, res) => {
    try {
        const type = req.query.type
        let users
        if (type == "moderator") {
            users = await User.find({ role: "moderator" })
            res.json(users)
        } else if (type == "customer") {
            users = await User.find({ role: "customer" })
            res.json(users)
        } else {
            users = await User.find()
            res.json(users)
        }
    } catch (error) {
        res.json(error)
    }
}

usersController.register = async (req, res) => {
    try {
        const body = req.body
        delete body.role //Deleting the role if user tries to create the user.role as admin
        const userObj = new User(body)
        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(userObj.password, salt)
        userObj.password = hashPassword
        const user = await userObj.save()
        res.json(user)
    } catch (error) {
        res.json(error)
    }
}

usersController.login = async (req, res) => {
    try {
        const body = req.body
        const userObj = await User.findOne({ email: body.email })
        if (userObj) {
            const match = await bcrypt.compare(body.password, userObj.password)
            if (match) {
                const tokenData = {
                    id: userObj._id,
                    role: userObj.role,
                    username: userObj.name
                }
                const token = jwt.sign(tokenData, process.env.SECRET)
                res.json(token)
            } else {
                res.json({
                    error: "Invalid Email or Password"
                })
            }
        } else {
            res.json({
                error: "Invalid Email or Password"
            })
        }
    } catch (error) {
        res.json(error)
    }
}

usersController.account = async (req, res) => {
    const id = req.user.id
    const user = await User.findById(id)
    if (user) {
        res.json(user)
    } else {
        res.json({})
    }
}

usersController.changeRole = async (req, res) => {
    try {
        const id = req.params.id
        const userObj = await User.findById(id)
        if (userObj) {
            if (userObj.role == "customer") {
                userObj.role = "moderator"
                const user = await userObj.save()
                res.json(user)
            } else if (userObj.role == "moderator") {
                userObj.role = "customer"
                const user = await userObj.save()
                res.json(user)
            }
        } else {
            res.json({
                error: "Invalid User"
            })
        }

    } catch (error) {
        res.json(error)
    }
}


module.exports = usersController