/* 외부 모듈 express를 require로 불러와 변수 express로 선언 */
var express = require('express');
/* express의 Router 모듈을 변수 router로 선언 */
var router = express.Router();

router.get('/', function(req, res, next) {

  res.render('find_idpw', {
    id: req.session.find_id,
    id_login: req.session.id_login,
    pw: req.session.find_pw_pw,
    pw_login: req.session.pw_login,
  });
});
/* 객체 참조로 router 호출을 하면 받는 값 */
module.exports = router;
