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

app.get("/info", (req, res)=>{
    res.render("info",{
        name:req.user.name,
        email:req.user.email,
        age:req.user.age,
        gender: req.user.gender
    })
})

app.get("/", (req, res)=>{
    var chickens = Chicken.find({type:"굽네"}, (err, info)=>{
        res.render("index",{
            info:info,
            logined:(req.user==undefined) ? false : true
        })
    });
    //console.log("유저",req.user)
})

app.get("/logined", auth.logined , (req,res)=>{
    res.send("logined")
})
app.listen(8000);