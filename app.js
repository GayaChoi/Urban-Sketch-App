//server
var express = require('express');
var path = require('path');
var morgan = require('morgan');
var app = express();
var session = require('express-session');
const route = require('./app/router/route');
const passport = require('passport');

// ejs 설정
app.locals.pretty = true;

app.set('views', __dirname + '/app/views');
// 브라우저 와 연동
/* app.engine('html',require('ejs').renderFile); */
app.set('view engine', 'ejs');

// 로그 읽어줌
app.use(morgan('dev'));
// 경로 설정
app.use(express.static(path.join(__dirname, '/app/views')));
app.use(session({ 
    secret: '12sdfwerwersdfserwerwef', 
    resave: true, 
    saveUninitialized: true
}));
  
// 쿠키를 사용 할 수 있게 함
app.use(require('cookie-parser')());
// 반드시 passport 는 session 위에서 동작함
app.use(passport.initialize());
app.use(passport.session());

app.use('/', route);

module.exports = app;