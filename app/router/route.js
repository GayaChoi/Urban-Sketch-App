const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const router = express.Router();
const upload = multer({
    storage: multer.diskStorage({
      destination: function(req, file, cb) {
        cb(null, 'app/views/uploads/');  
      },
      filename: function(req, file, cb) {
        cb(null, new Date().valueOf() + path.extname(file.originalname)); 
      }  
    }),

    limits: { fileSize: 5 * 1024 * 1024}
});

let imgApp = {}; // form 에서 넘겨받은 데이터를 저장하는 객체

bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());

// 메인 페이지
router.get('/', function(req, res) {
    res.render('index.html');
});

// 자랑하기 페이지(로그인 및 정보 전송)
router.get('/add', function(req, res) {
    res.render('add.html');
});

// 구경하기 페이지
router.get('/gallery', function(req, res) {

    res.render('gallery.html',{
        title: imgApp.title,
        path: imgApp.src,
        loc: imgApp.location,
        author: imgApp.author,
        des: imgApp.description
    });
});

// 구경하기 링크 페이지
router.get('/view', function(req, res) {
    res.render('galleryView.html',{
          title: imgApp.title,
          path: imgApp.src,
          loc: imgApp.location,
          author: imgApp.author,
          des: imgApp.description
     });
});

// 판매하기 페이지
router.get('/sale', function(req, res) {
    res.render('sale.html');
});

// 업로드 처리 페이지
router.post('/uploads', upload.single('img'), function(req, res) {
    
    imgApp = {
       'src': req.file.filename,
       'title': req.body.title,
       'location': req.body.location,
       'author': req.body.author,
       'description': req.body.description    
    };

    res.redirect('/view');
});

// 판매하기 팝업
router.get('/saleInfo', function(req, res) {
    res.render('saleInfo.html');
});

// 404 에러페이지
router.get('/:pageId', function(req, res) {
    res.render('404.html');
});


module.exports = router;