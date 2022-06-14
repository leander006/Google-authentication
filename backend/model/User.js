const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId:{
        type:String,
        required:false,
        unique:true
    },
    username:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
},
{timestamps:true}
)

module.exports = mongoose.model("user",userSchema)