const mongoose = require('mongoose')

const { Schema } = mongoose;
//user ko ky ky chahiye
const UserSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    location:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('user',UserSchema)