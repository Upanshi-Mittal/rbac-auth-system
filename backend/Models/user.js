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
    date:Date,
    product_id:{type:Number,
        required:true,
        unique:true
    },
    product_name: {
        type: String,
        required:true,
    },
    desc: {
        type: String,
        required : false
    },
})
const usermodel=mongoose.model('user',userschema)
const productmodel=mongoose.model('product',productSchema)
module.exports={usermodel,productmodel};