var Chicken = require("../db/Schemas/chicken")
const auth = {
    logined: async(req, res, next)=>{
        if(req.user!=undefined){//로그인됬을때
            next();
        }else{//로그인안됬을때
            var chickens = await Chicken.find({type:"굽네"}).sort({like_count:-1});
            await res.render("index",{
                info:chickens,
                logined:(req.user==undefined) ? false : true})
            console.log("로그인안함")
        }
    }
}

module.exports = auth;