const mongoose=require ('mongoose')

const adminSchema=new mongoose.Schema({
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
    password:{
        type:String
    },
    newpassword:{
        type:String
    },
    Token:{
        type:String,
        default:" "
    },
    role:['admin','user']

})

module.exports=mongoose.model('admin',adminSchema)