const mongoose= require('mongoose')
const validator= require('validator')

const userSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail,"Please Enter a Valid Email"]
    },
    password:{
        type:String,
        required:true
    },
    
})

let uSers=mongoose.model("Users",userSchema)
module.exports= uSers
