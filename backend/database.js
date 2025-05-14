const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config({path : "./config.env"})


const dbconnection = ()=>{
    const DB = process.env.DATABASE
    mongoose.connect(DB)
    console.log("connection success to database")
}

module.exports = dbconnection;