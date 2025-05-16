const express = require("express")
const cors = require("cors")
const app = express()
const dotenv = require("dotenv")
dotenv.config({path : "./config.env"})
const bodyparser = require("body-parser")
const dbconnection = require("./database")
app.use(express.json())
app.use(cors({
    origin : "http://localhost:3000",
    credentials : true
}))
const users = require('./router')
app.use('/api/v1' , users)

app.use(bodyparser.json)

const PORT = process.env.PORT

app.listen(PORT , ()=>{
    dbconnection()
    console.log("database connection success")
})