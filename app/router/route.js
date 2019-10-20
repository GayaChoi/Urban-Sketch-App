var express = require('express');
var passport = require('passport');
var router = express.Router();

require('dotenv').config({path: __dirname + '/.env'});

// 메인 페이지
router.get('/', function(req, res) {
    console.log(req.user);
    res.render('index',{user:req.user});
});

// facebook login 처리
router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback', 
  // 로그인 실패 할 시 오류 페이지로 돌아가기
  passport.authenticate('facebook', { failureRedirect: '/404' }),
  function(req, res) {
    res.redirect('/');
  });

router.get('/post/:pageId', function(req, res) {
    res.render('post');
});

// 404 에러페이지
router.get('/:pageId', function(req, res) {
   res.render('404',{errorStatus:"404 NotFound",context:"페이지를 찾을 수 없습니다."}); 
});

router.all('*', function(req, res) {
    res.redirect('/404');
});

// ERROR Handling

router.use(function(req, res) {
   res.status(500).render('404',{errorStatus:"500 Internal Server Error",context:"관리자에게 문의해주세요."});
});

module.exports = router;