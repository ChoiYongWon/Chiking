var express = require("express")
var router = express.Router()
var User = require("../db/Schemas/user")

var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;


  passport.serializeUser(function(profile, done) {
    console.log("시리얼라이즈",profile)
    done(null, profile.id);
  });
  
  passport.deserializeUser(function(id, done) {
    console.log("디시리얼라이즈",id)
    User.find({id:id}, (err, info)=>{
      if (err) { return done(err); }
      console.log("deserializeuser",info[0])
      done(null, info[0]);
    })

  });

passport.use(new FacebookStrategy({
    clientID: "426311531381060",
    clientSecret: "ce98040e480d3bfca5750367d4992561",
    callbackURL: "https://chiking.kr/auth/facebook/callback",
    profileFields :["id", "emails", "name", "age_range", "birthday", "gender"]
  },
  function(accessToken, refreshToken, profile, done) {
    console.log("FACEBOOK STRATEGY",accessToken, refreshToken, profile)
    User.find({id:profile.id}, (err, info)=>{
      if(info.length>0){
        done(null, info[0]);
      }else{
        console.log("저장",profile)
        var user = new User({
          id:profile.id,
          name:profile._json.last_name+profile._json.first_name,
          email:profile._json.email,
          /*age:profile._json.age_range.min,
          gender:profile.gender,*/
          vote_count: 3
        })
        user.save()
        done(null, user);
      }
    })
  }
));

router.get('/facebook',
  passport.authenticate('facebook', { scope: ['email'/*, 'user_age_range', 'user_birthday', 'user_gender'*/] })
);

router.get('/facebook/callback',
  passport.authenticate('facebook', { /*successRedirect: '/main',*/
                                      failureRedirect: '/' }),
                                      function(req, res){
                                        req.session.save(function(){
                                          res.redirect("/")
                                        })
                                      });

module.exports = router;