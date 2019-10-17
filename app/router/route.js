var express = require('express');
var path = require('path');
var passport = require('passport');
var compression = require('compression');
var FacebookStrategy = require('passport-facebook').Strategy;
var app = express();
var router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({
    storage: multer.diskStorage({
      destination: function(req, file, cb) {
        cb(null, 'app/views/uploads/');  
      },
      filename: function(req, file, cb) {
        cb(null, new Date().valueOf() + path.extname(file.originalname)); 
      }  
    }),

    limits: { fileSize: 1 * 1024 * 1024}
});

var imgApp = {}; // form 에서 넘겨받은 데이터를 저장하는 객체
require('dotenv').config({path: __dirname + '/.env'});
// POST 메소드 값 추출
bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());
app.use(compression());


passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: 'https://urban-sketch.herokuapp.com/auth/facebook/callback' 
}, 
function(accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
}));

passport.serializeUser(function(user, cb) {
     cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
     cb(null, obj);
}); 

// 메인 페이지
router.get('/', function(req, res, next) {
    res.render('index.html');
});

// 자랑하기 페이지(로그인 및 정보 전송)
router.get('/add', function(req, res, next) {
  console.log("user login:" + req.user);
  res.render('add.html', { user: req.user }); 
});  

// facebook login 처리
router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback', 
  // 로그인 실패 할 시 오류 페이지로 돌아가기
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

// 구경하기 페이지
router.get('/gallery',
  function(req, res, next) { 
      if (!(imgApp)) {
        next();  
      } else {
        res.render('gallery.html', { imgApp,user: req.user }); 
      
        // 중복을 제거 하기 위해 초기화
        for (index in imgApp) {
          imgApp[index] = null;
        }
      }
  });

// 업로드 처리 페이지
// 로그인 에 성공 할 시 실행
router.post('/uploads', 
  upload.single('img'), 
     function(req, res, next) {
        if (req.file === undefined) {
          res.status(400).render('404.html',{errorStatus:"400 Bad Request",context:"이미지를 업로드해주세요."});  
        } else if (!(imgApp)) {
          res.status(502).render('404.html',{errorStatus:"502 Bad Gateway",context:"관리자에게 문의 해주세요."});
        } else {
          imgApp = {
            'src': '../' + req.file.filename,
            'title': req.body.title,
            'location': req.body.location,
            'author': req.user.displayName,
            'description': req.body.description  
          };     

        res.redirect('/gallery');
    }
});

// 404 에러페이지
router.get('/:pageId', function(req, res, next) {
    res.render('404.html',{errorStatus:"404 NotFound",context:"페이지를 찾을 수 없습니다."});
});

/* 404 처리 및 링크 페이지 */
router.get('/gallery/:pageId/', 
  function(req, res, next) {
      if ((req.params.pageId.indexOf('pageId=')) !== -1 && (req.params.pageId !== "pageId=")) {
        res.render('view.html'); 
      } else {
        res.render('404.html',{errorStatus:"404 NotFound",context:"페이지를 찾을 수 없습니다."});
      }
});

router.get('/add/:pageId/', 
  function(req, res, next) {
    res.render('404.html',{errorStatus:"404 NotFound",context:"페이지를 찾을 수 없습니다."});  
});


router.all('*', function(req, res, next) {
    console.log(req);
    res.status(404).redirect('/404');
});

// ERROR Handling

router.use(function(req, res) {
   res.status(500).render('404.html',{errorStatus:"500 Internal Server Error",context:"관리자에게 문의해주세요."});
});

module.exports = router;