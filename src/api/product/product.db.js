const mongoose=require(mongoose)

const ProductSchema=new mongoose.schema(products,{
    product_id:{
        type:String,
        required:true
    },
    transection_id:{
        type:String,
        required:true
    },
    productname:{
        type:String

    },
    price:{
        
    },
    price:{
        type:String,
        reuired:true

    },
    expiredate:{
        type:Date

    },
    quility:{
        type:String

    },
    quantity:{
        type:String

    },
   fat:{
        type:String

    },

})

module.exports=mongoose.model('product',ProductSchema)