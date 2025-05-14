const mongoose = require("mongoose")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = new mongoose.Schema({
    name : {
        type : String ,
        required : true,
        minlength : 3
    },
    email : {
        type  : String ,
        required : true,
        unique : true 
    },
    password : {
        type : String ,
        required : true ,
        minlength : 6
    },
    createdat : {
        type : Date ,
        default : Date.now()
    },
    roles : {
        type : String ,
        default : "user"
    }
})

User.pre("save" ,  async function () {

    this.password = await bcryptjs.hash(this.password , 10)
})

User.methods.generatetoken =  function () {

    return  jwt.sign({id : this._id} , "shivam" , {expiresIn : 2})
    
    
}

User.methods.comparepassword = async function (enteredpassword) {
    return await bcryptjs.compare(enteredpassword , this.password)
}
module.exports = mongoose.model("userData" , User)
