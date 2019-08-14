const express = require('express');

/* models 모듈에서 User 모델을 호출하여 User 로 선언 */
var User = require('../models').User;

const router = express.Router();

/* post 방식으로 호출된 router를 처리 */
router.post('/', function (req, res, next) {
  req.session.pw_auth = false;
  if (req.body.find_id_email && req.body.find_id_name) {
    /* User 테이블의 데이터를 가져오는 SQL문 */
    User.findAll({

      /* db_business_num, db_id, db_pw 값을 가져옴 */
      attributes: ['db_id'],

      /* 조건과 값이 일치하는 경우 */
      where: {
        db_email: req.body.find_id_email,
        db_name: req.body.find_id_name
      }
    })
      /* 조회 성공시 */
      .then((result) => {
        console.log("result : " + JSON.stringify(result));

        let DB1 = JSON.stringify(result);
        console.log("JSON.parse(DB1) : " + JSON.parse(DB1));
        let DB2 = JSON.parse(DB1);
        let DB = DB2[0];
        id = DB.db_id;

        if (id) {
          req.session.find_id = id
          req.session.id_login = true;
          console.log("ㅁㄴㅇㅁㄴㅇㄴㅇㄴㅇreq.session.login : " + req.session.id_login);
          res.send('true')
        } else {
          res.send('false');
        }
        console.log("login.req.session.login : " + req.session.login);
      })
      /* 조회 실패시 */
      .catch((err) => {
        console.error("err aaaa : " + err);
        res.send('false');
      });

  } else if (req.body.find_pw_email && req.body.find_pw_id) {
    /* User 테이블의 데이터를 가져오는 SQL문 */

    User.findAll({
      attributes: ['db_id'],

      /* 조건과 값이 일치하는 경우 */
      where: {
        db_email: req.body.find_pw_email,
        db_id: req.body.find_pw_id
      }
    })
      /* 조회 성공시 */
      .then((result) => {

        req.session.email = req.body.find_pw_email;
        req.session.lid = req.body.find_pw_id;

        let DB2 = JSON.stringify(result);
        let DB1 = JSON.parse(DB2);
        let DB = DB1[0];
        id = DB.db_id;
        if (req.body.find_pw_id == id) {
          req.session.pw_login = true;
          res.redirect('find_idpw')
        }

      })
      /* 조회 실패시 */
      .catch((err) => {
        console.error("err aaaa : " + err);
        res.send('false');
      });

  }

});

module.exports = router;