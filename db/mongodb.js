var mongoose = require("mongoose")
var User = require("./Schemas/user")
var Chicken = require("./Schemas/chicken")
var init = require("../init/chicken_init")
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://root:kelly10975@cluster0-ebww6.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(url, { useNewUrlParser: true });


module.exports = () => {
    const connect = () =>{
        // client.connect(err => {
        //     const collection = client.db("test").collection("devices");
        //     // perform actions on the collection object
        //     client.close();
        //   });
        mongoose.connect(url,{ dbName:"Chiking", useNewUrlParser: true},
            async (error)=>{
                if(error){
                    console.log("몽고디비 에러")
                }else{
                    console.log("몽고디비 연결 성공")

                    //init.init()
                    // var chickens = Chicken.find({type:"굽네"}, (err, info)=>{
                    //     console.log(info)
                }
                   }       )
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