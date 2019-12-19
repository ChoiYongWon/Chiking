var express = require("express")
var router = express.Router()
var auth = require("../auth/authorize")

router.post("/",auth.logined, (req, res)=>{
    res.send({
        name:req.user.name,
        id: req.user.id
        /*email:req.user.email,
        age:req.user.age,
        gender: req.user.gender,*/
        result:true
    })
    console.log("통신성공이요")
})

module.exports = router;