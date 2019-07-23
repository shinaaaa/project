/* 외부 모듈 express를 require로 불러와 변수 express로 선언 */
const express = require('express');
/* models 모듈에서 MyPage 모델을 호출하여 MyPage 로 선언 */
var MyPage = require('../models').MyPage;
/* express의 Router 모듈을 변수 router로 선언 */
const router = express.Router();

/* post 방식으로 호출된 router를 처리 */
router.get('/', function (req, res, next) {
  if(req.session.login) {
  if (req.session.lid) {
    /* MyPage 테이블의 데이터를 가져오는 SQL문 */
    MyPage.findAll({

    attributes: ['db_image'],

    /* 조건과 값이 일치하는 경우 */
    where: {
      db_id: req.session.lid
    }
  })
    /* 조회 성공시 */
    .then((result) => {
      console.log("result : " + JSON.stringify(result));

      let DB1 = JSON.stringify(result);
      console.log("JSON.parse(DB1) : " + JSON.parse(DB1));
      let DB2 = JSON.parse(DB1);
      let DB = JSON.stringify(DB2);

      req.session.DB = DB2;
      req.session.DB_length = DB2.length;

      res.render('mypage2', {
        loginState: req.session.login,
        name: req.session.name,
        image: req.session.image,
        DB: req.session.DB,
        length: req.session.DB_length
      });
    })
    /* 조회 실패시 */
    .catch((err) => {
      console.error("err : " + err);
      next(err);
    });
  }
} else {
  res.redirect('/login');
}

});
/* 객체 참조로 router 호출을 하면 받는 값 */
module.exports = router;