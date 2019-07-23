/* 외부 모듈 express를 require로 불러와 변수 express로 선언 */
const express = require('express');
/* models 모듈에서 User 모델을 호출하여 User 로 선언 */
var User = require('../models').User;
/* express의 Router 모듈을 변수 router로 선언 */
const router = express.Router();

/* post 형식으로 라우트 경로를 '/'로 지정함 */
router.post('/', function (req, res, next) {
  /* req.body.login_id가 없을 경우 */
  if (!req.body.login_id) {
    /* JSON 응답을 전송 */
    res.json(JSON.stringify("아이디를 입력하세요"));
    /* req.body.login_pw가 없을 경우 */
  } else if (!req.body.login_pw) {
    /* JSON 응답을 전송 */
    res.json(JSON.stringify("비밀번호를 입력하세요"));
  } else {
    /* User 테이블의 데이터를 가져오는 SQL문 */
    User.findAll({

      /* db_email, db_id, db_name, db_pw, db_birth, db_image 값을 가져옴 */
      attributes: ['db_email', 'db_id', 'db_name', 'db_pw', 'db_birth', 'db_image'],

      /* 조건과 값이 일치하는 경우 */
      where: {
        db_id: req.body.login_id,
        db_pw: req.body.login_pw
      }
    })
      /* 조회 성공시 */
      .then((result) => {
        /* 인수로 전달받은 자바스크립트 객체를 문자열로 변환하여 반환 */
        let DB2 = JSON.stringify(result);
        /* 인수로 전달받은 문자열을 자바스크립트 객체로 변환하여 반환 */
        let DB1 = JSON.parse(DB2);
        /* 배열 DB1의 0번째 */
        let DB = DB1[0];
        /* DB가 존재 할 경우 */
        if (DB) {
          /* req.session.login 값을 true */
          req.session.login = true;

          /* DB의 키 값이 존재하지 않을때 까지 반복 */
          for (key in DB) {
            /* key 값이 db_name과 같을 경우 */
            if (key === "db_name") {
              /* req.session.name 값을 DB[key] */
              req.session.name = DB[key];
              /* key 값이 db_image과 같을 경우 */
            } else if (key === "db_image") {
              /* req.session.image 값을 DB[key] */
              req.session.image = DB[key];
            }
            /* key 값이 db_email과 같을 경우 */
            else if (key === "db_email") {
              /* req.session.email 값을 DB[key] */
              req.session.email = DB[key];
            }
            /* key 값이 db_id과 같을 경우 */
            else if (key === "db_id") {
              /* req.session.lid 값을 DB[key] */
              req.session.lid = DB[key];
            }
            /* key 값이 db_pw과 같을 경우 */
            else if (key === "db_pw") {
              /* req.session.pw 값을 DB[key] */
              req.session.pw = DB[key];
            }
            /* key 값이 db_birth과 같을 경우 */
            else if (key === "db_birth") {
              /* req.session.birth 값을 DB[key] */
              req.session.birth = DB[key];
            }
          }
          /* JSON 응답을 전송 */
          res.json(JSON.stringify("로그인되었습니다."));
        } else {
          /* JSON 응답을 전송 */
          res.json(JSON.stringify("등록되지않은 사용자 이거나 비밀번호가 틀렸습니다."));
        }

      })
      /* 조회 실패시 */
      .catch((err) => {
        console.error("err : " + err);
        next(err);
      });
  }
});
/* 객체 참조로 router 호출을 하면 받는 값 */
module.exports = router;