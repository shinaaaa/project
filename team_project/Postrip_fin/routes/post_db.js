const express = require('express');

/* models 모듈에서 User 모델을 호출하여 User 로 선언 */
var MyPage = require('../models').MyPage;

const multer = require('multer');
//파일 업로드 모듈

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/mypage')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname )
  }
})

const upload = multer({
  storage: storage, limits: { fileSize: 1024 * 1024 * 10 }, fileFilter: function (req, file, callback) {
    if (file.mimetype.indexOf('image') === -1) {
      req.validateErr = '<script>alert("이미지 파일만 업로드 가능합니다."); history.go(-1);</script>';
      callback(null, false, new Error('이미지 파일만 업로드 가능합니다.'));
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@안녕 다시 업로드 해")
    } else {
      callback(null, true);
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!안녕 업로드 성공")
    }
  }
});

const router = express.Router();

router.post('/', upload.single('post_img'), function (req, res) {
  if (req.validateErr) {
    return res.send(req.validateErr);
  } else if (!req.file) {
    return res.send('<script>alert("파일을 업로드 해주세요."); history.go(-1);</script>');
  } else {
  /* MyPage 테이블의 데이터를 생성하는 SQL문 */
  MyPage.create({
    db_id:req.session.lid,
    db_image: req.file.filename
  })
    /* 조회 성공시 */
    .then((result) => {
      console.log("result1231231231231231231231231312 : " + result);
      /* result 값을 json 형태로 리턴 */
      req.status(201).json(result);
    })
    /* 조회 실패시 */
    .catch((err) => {
      console.error("err : " + err);
    });
    res.redirect('/mypage2');
}

  /* User 테이블의 데이터를 생성하는 SQL문 */
  
});

module.exports = router;