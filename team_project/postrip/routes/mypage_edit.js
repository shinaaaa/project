/* 외부 모듈 express를 require로 불러와 변수 express로 선언 */
var express = require('express');
/* express의 Router 모듈을 변수 router로 선언 */
var router = express.Router();

/* post 형식으로 라우트 경로를 '/'로 지정함 */
router.get('/', function(req, res, next) {
  /* 세션에 login 값이 존재할 경우 */
  if(req.session.login) {
    res.render('mypage_edit', {
      loginState: req.session.login,
      name:req.session.name,
      email:req.session.email,
      id: req.session.lid,
      pw: req.session.pw,
      birth:req.session.birth,
      image:req.session.image
    });
  } else {
    res.redirect('/login');
  }
});
/* 객체 참조로 router 호출을 하면 받는 값 */
module.exports = router;