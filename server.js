var express = require("express")
var app = express();
var mongoose_server = require("./db/mongodb")()
var session = require("express-session")
var FileStore = require("session-file-store")(session)
var passport = require("passport")
var fb = require("./routes/facebook")
var logout = require("./routes/logout")
var auth = require("./auth/authorize")
var Chicken = require("./db/Schemas/chicken")
var vote = require("./routes/vote")
var info = require("./routes/info")
var policy = require("./routes/policy")

app.set("view engine", "ejs")
app.set("views", "./views")

app.use(express.static(__dirname+"/public"))
app.use(session({
    
    secret:"secret",
    resave: false,
    saveUninitialized: true,
    store: new FileStore({logFn: function(){}}),
    cookie:{
        secure:false
    }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/auth", fb)
app.use("/logout", logout)
app.use("/vote", vote)
app.use("/info", info)
app.use("/policy",policy)


app.get("/", auth.logined,async(req, res)=>{
    var chickens = await Chicken.find({type:"굽네"}).sort({like_count:-1});
    await res.render("index",{
        email:req.user.email,
        info:chickens,
        logined:(req.user==undefined) ? false : true
    })
    console.log("로그인함")
    //console.log("유저",req.user)
})

app.get("/logined", auth.logined , (req,res)=>{
    res.send("logined")
})
app.listen(80);