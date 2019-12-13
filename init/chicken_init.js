var Chicken = require("../db/Schemas/chicken")
const arr = ["갈비천왕","고추바사삭","그릴후랑크","딥치즈","마라볼케이노","볼케이노","볼케이노모짜렐라","볼케이노쌀떡볶이","스윗볼케이노","양념치킨","오리지널","치트킹","핫갈비천왕","허니멜로"]

module.exports = {

    init: () => {
        for(var i=0; i<arr.length;i++){
            var chicken = new Chicken({
                name:arr[i],
                type:"굽네",
                like_count:0,
                like:[]
            })
            chicken.save();
        }
        console.log("치킨 저장완료")
    }
}