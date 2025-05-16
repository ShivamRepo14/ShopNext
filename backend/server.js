const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const bodyparser = require("body-parser");
const dbconnection = require("./database");

app.use(cors({
    origin: ["https://shop-next-nirm.vercel.app"], 
    credentials: true
}));

app.use(express.json());
app.use(bodyparser.json()); 

const users = require('./router');
app.use('/api/v1', users);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    dbconnection();
    console.log("database connection success");
});
