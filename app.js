var express = require("express")
var app = express();
var mongoose_server = require("./db/mongodb")()
var session = require("express-session")
var FileStore = require("session-file-store")(session)
var passport = require("passport")
var fb = require("./routes/facebook")

app.set("view engine", "ejs")
app.set("views", "./views")

app.use(session({
    secret:"secret",
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
    cookie:{
        secure:false
    }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/auth", fb)

app.get("/info", (req, res)=>{
    res.render("info",{
        name:req.user.name,
        email:req.user.email,
        age:req.user.age,
        gender: req.user.gender
    })
})

app.get("/", (req, res)=>{
    res.render("index")
})

app.listen(8000);