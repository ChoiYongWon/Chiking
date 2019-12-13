var mongoose = require("mongoose")
var User = require("./Schemas/user")
var Chicken = require("./Schemas/chicken")
var init = require("../init/chicken_init")

module.exports = () => {
    const connect = () =>{
        mongoose.connect("mongodb://root:kelly10975@localhost:27017/admin",{ dbName:"Chiking", useNewUrlParser: true},
            async (error)=>{
                if(error){
                    console.log("몽고디비 에러")
                }else{
                    console.log("몽고디비 연결 성공")

                    //init.init()
                    // var chickens = Chicken.find({type:"굽네"}, (err, info)=>{
                    //     console.log(info)
                    // });
                }
            }
        )
    }

    connect();
    mongoose.connection.on("error", (error)=>{
        console.error("몽고디비 연결 에러", error)
    })

    mongoose.connection.on("disconnected", ()=>{
        console.error("몽고디비 연결이 끊김, 연결 재시도중")
        connect();
    })

    return mongoose;

}