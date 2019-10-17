var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

require('dotenv').config({path: __dirname + '/.env'});

module.exports = function() {
     passport.serializeUser(function(user, cb) {
          cb(null, user);
     });
        
     passport.deserializeUser(function(obj, cb) {
          cb(null, obj);
     }); 
     
     passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: 'https://urban-sketch.herokuapp.com/auth/facebook/callback' 
     }, 
     function (accessToken, refreshToken, profile, cb) { // 토큰 요청을 함  
        return cb(null, profile);
     }));
};