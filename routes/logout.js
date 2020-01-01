var express = require("express")
var router = express.Router();

router.get("/", (req,res)=>{
    req.logOut()
    req.session.save(function(){
        res.redirect("/")
    })
})

module.exports = router;