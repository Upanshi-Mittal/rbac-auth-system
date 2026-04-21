const mongoose=require('mongoose');

const userschema=new mongoose.Schema({
    name:{type:String ,
        required:true
    },

    email:{type:String ,
        required:true,
        unique:true
    },

    password:{type:String ,
        required:true
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
})

const productSchema=new mongoose.Schema({
    name: {
        type: String,
        required:true,
    },
    description: {
        type: String,
        required : false
    },
    price:{
        type: Number,
        required : true
    } 
})
const usermodel=mongoose.model('user',userschema)
const productmodel=mongoose.model('product',productSchema)
module.exports={usermodel,productmodel};