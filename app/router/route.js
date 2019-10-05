var express = require('express');
var path = require('path');
var login =  require('connect-ensure-login');
var passport = require('passport');
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

let imgApp = {}; // form 에서 넘겨받은 데이터를 저장하는 객체
let num = 0;
// POST 메소드 값 추출
bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());

// 메인 페이지
router.get('/', function(req, res) {
    res.render('index.html');
});

// 자랑하기 페이지(로그인 및 정보 전송)
router.get('/add', function(req, res) {
    res.render('add.html', { user: req.user });
});

// 구경하기 페이지
router.get('/gallery',
  function(req, res) {
      res.render('gallery.html', {
        title: imgApp.title,
        path: imgApp.src,
        loc: imgApp.location,
        author: imgApp.author,
        user: req.user,
        num: num
      }); 
      
      // 중복을 제거 하기 위해 초기화
      for (index in imgApp) {
         imgApp[index] = null;
      }
  });

// 판매하기 페이지
router.get('/sale', 
  login.ensureLoggedIn('/add'),
      function(req, res) {  
      res.render('sale.html');
});

// 판매하기 팝업
router.get('/saleInfo', 
  login.ensureLoggedIn('/add'),
     function(req, res) {
     res.render('saleInfo.html');
});  

// 업로드 처리 페이지
// 로그인 에 성공 할 시 실행
router.post('/uploads', 
     upload.single('img'), 
     function(req, res) {
      imgApp = {
        'src': req.file.filename,
        'title': req.body.title,
        'location': req.body.location,
        'author': req.body.author,
        'description': req.body.description    
      };     
      
      res.redirect('/gallery');
      num++; 
});

// facebook login 처리
router.get('/fb/login', passport.authenticate('facebook'));

router.get('/return', 
  // 로그인 실패 할 시 오류 페이지로 돌아가기
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
      res.redirect('/add');
  });

// 404 에러페이지
router.get('/:pageId', function(req, res) {
    res.render('404.html');
});


module.exports = router;