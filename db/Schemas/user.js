var mongoose = require("mongoose")
const {Schema} = mongoose;
const userSchema = new Schema({
    id:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    /*age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },*/
    vote_count:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("User", userSchema)