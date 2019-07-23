/* 외부 모듈 express를 require로 불러와 변수 express로 선언 */
const express = require('express');
/* express의 Router 모듈을 변수 router로 선언 */
const router = express.Router();
/* models 모듈에서 User 모델을 호출하여 User 로 선언 */
var User = require('../models').User;

/* get 형식으로 라우트 경로를 '/'로 지정함 */
router.get('/', function (req, res) {
  /* User 테이블의 데이터를 삭제하는 SQL문 */
  User.destroy({
    where: { db_email: req.session.email },
    force: true
  })
    /* 조회 성공시 */
    .then((result) => {
      console.log("result : " + result);
      /* result 값을 json 형태로 리턴 */
      req.status(201).json(result);
    })
    /* 조회 실패시 */
    .catch((err) => {
      console.error("err : " + err);
    });
  /* 세션 값을 삭제 */
  req.session.destroy(function (err) {
    /* JSON 응답을 전송 */
    res.json(JSON.stringify("탈퇴되었습니다."));
  });
});
/* 객체 참조로 router 호출을 하면 받는 값 */
module.exports = router;