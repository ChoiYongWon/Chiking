 var express = require("express")
 var router = express.Router();
 var Chicken = require("../db/Schemas/chicken")
 var User = require("../db/Schemas/user")
 var mongoose = require("mongoose")

 router.post("/", (req,res)=>{
     var vote_info = req.body;
     console.log(vote_info)
     User.findOne({email:vote_info.email},async(err, info)=>{
        var chicken = await Chicken.findOne({name:vote_info.chicken});
        if(chicken.like.indexOf(mongoose.Types.ObjectId(info._id))!=-1){
            return res.send({result:false, type:"already"})
        }else if(info.vote_count==0){
            return res.send({result:false, type:"nocount"})
        }else{
            await Chicken.updateOne({name:vote_info.chicken},{$push:{like:mongoose.Types.ObjectId(info._id)},$inc:{like_count:1}}).exec()
            await User.updateOne({email:vote_info.email},{$inc:{vote_count:-1}})
            await res.send({result:true})
        }
     })
 })

 module.exports = router;