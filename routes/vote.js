 var express = require("express")
 var router = express.Router();
 var Chicken = require("../db/Schemas/chicken")
 var User = require("../db/Schemas/user")
 var mongoose = require("mongoose")

 router.post("/", (req,res)=>{
     var vote_info = req.body;
     console.log(vote_info)
     User.findOne({email:vote_info.email},async(err, info)=>{
        await Chicken.updateOne({name:vote_info.chicken},{$push:{like:mongoose.Types.ObjectId(info._id)},$inc:{like_count:1}}).exec()
        await res.send({result:true, chicken: vote_info.chicken})
     })
 })

 module.exports = router;