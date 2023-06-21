const express = require("express")
const cors = require("cors")
const router = require("./config/routes")
const configureDb = require("./config/database")
const port = 3232

const app = express()

app.use(express.json())
app.use(cors())
app.use(router)

app.listen(port, (req, res)=>{
    console.log("Server is Connected to port", port)
})

configureDb()