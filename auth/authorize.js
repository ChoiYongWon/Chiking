const auth = {
    logined: (req, res, next)=>{
        if(req.user!=undefined){//로그인됬을때
            next();
        }else{//로그인안됬을때
            res.send("not logined")
        }
    }
}

module.exports = auth;