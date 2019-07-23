/* 외부 모듈 express를 require로 불러와 변수 express로 선언 */
var express = require('express');
/* express의 Router 모듈을 변수 router로 선언 */
var router = express.Router();

router.get('/', function(req, res, next) {
  /* req.session.login에 값이 있을 경우 */
  if(req.session.login) {
    /* mypage2로 경로를 재지정함 */
    res.redirect("/mypage2");
    /* req.session.login에 값이 없을 경우 */
  } else {
    /* login 페이지로 렌더링함 */
    res.render('login');
  }
});
/* 객체 참조로 router 호출을 하면 받는 값 */
module.exports = router;
