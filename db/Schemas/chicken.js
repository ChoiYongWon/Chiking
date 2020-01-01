var mongoose = require("mongoose")
const {Schema} = mongoose;
const chickenSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    like_count:{
        type: Number,
        required: true
    },
    like:[{type:mongoose.Types.ObjectId, ref:"User"}],
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("Chicken", chickenSchema)