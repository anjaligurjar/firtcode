const mongoose=require ('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String
    },
    lastname:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    id:{
        type:String
    },
    resetpassword:{
        type:String
    },
    Token:{
        type:String,
        default:" "
    }

})

module.exports=mongoose.model('user',userSchema)