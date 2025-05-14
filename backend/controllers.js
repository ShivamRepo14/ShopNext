const User = require("./userSchema")

exports.register= async(req , res)=>{
    const {name , email , password} = req.body;

    const user = await User.findOne({email})
    if(!user){
         const users = await User.create({name , email , password})
         const token =   await users.generatetoken()
        res.status(200).json({users , token})
    }else{
        res.status(400).json({msg : "email already exists!"})
    }
}

exports.login = async(req ,res)=>{
    const {email , password} = req.body;
    
    const useremail = await User.findOne({email})
    const pass = await useremail.comparepassword(password)
    if(!pass){
        res.status(400).json({msg : "invalid email or password"})
    }else{
        res.json({msg : "login success"})
    }
}
