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
        // TODO: 비밀 키는 env 사용(heroku 에서 도 따로 설정),url 은 heroku 런칭 후 변경   
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: '/return'
     }, 
     function (accessToken, refreshToken, profile, cb) { // 토큰 요청을 함
        return cb(null, profile);
     }));
};