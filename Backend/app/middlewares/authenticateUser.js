const jwt = require("jsonwebtoken")
require("dotenv").config()

const authenticateUser = async(req, res, next)=>{
    try {
        const token = req.header("Auth")
        const tokenData = jwt.verify(token, process.env.SECRET)
        req.user = {
            id:tokenData.id,
            role:tokenData.role
        }
        next()
    } catch (error) {
        res.json(error)
    }
  
}

module.exports = authenticateUser