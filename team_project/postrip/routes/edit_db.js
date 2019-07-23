/* 외부 모듈 express를 require로 불러와 변수 express로 선언 */
const express = require('express');
/* models 모듈에서 User 모델을 호출하여 User 로 선언 */
var User = require('../models').User;
/* models 모듈에서 User 모델을 호출하여 User 로 선언 */
const multer = require('multer');
/* 디스크 스토리지 엔진은 파일을 디스크에 저장하기 위한 모든 제어 기능을 제공 */
var storage = multer.diskStorage({
  /* 어느 폴더안에 업로드 한 파일을 저장할 지를 결정 */
  destination: function (req, file, cb) {
    /* upload 폴더에 파일을 저장 */
    cb(null, 'upload/')
  },
  /* 폴더안에 저장되는 파일 명을 결정하는데 사용 */
  filename: function (req, file, cb) {
    /* 파일명이 중복되는 것을 막기 위해서 서버시간 + 파일명으로 지정 */
    cb(null, Date.now() + '-' + file.originalname)
  }
})
/* storage의 옵션을 가진 multer를 변수 upload로 선언 */
const upload = multer({ storage: storage });
/* express의 Router 모듈을 변수 router로 선언 */
const router = express.Router();
/* name이 'post_img'인 파일의 정보를 가져와 post 형식으로 라우트 경로를 '/'로 지정함 */
router.post('/', upload.single('img'), function (req, res) {
  /* User 테이블의 데이터를 생성하는 SQL문 */
  User.update({
    db_email:req.body.edit_email,
    db_id:req.body.edit_id,
    db_name: req.body.edit_name,
    db_pw: req.body.edit_pw,
    db_birth:req.body.edit_birth,
    db_image: req.file.filename
  },
    {
      where: {
        db_email: req.session.email
      }
    })
    /* 조회 성공시 */
    .then((result) => {
      console.log("result : " + result);
      
      req.status(201).json(result);

    })
    /* 조회 실패시 */
    .catch((err) => {
      console.error("err : " + err);
    });
    req.session.image = req.file.filename;
    res.redirect('/mypage2');
});
/* 객체 참조로 router 호출을 하면 받는 값 */
module.exports = router;