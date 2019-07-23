/* 외부 모듈 express를 require로 불러와 변수 express로 선언 */
var express = require('express');
/* express의 Router 모듈을 변수 router로 선언 */
var router = express.Router();

/* get 형식으로 라우트 경로를 '/'로 지정함 */
router.get('/', function (req, res, next) {
  /* 세션에 login 값이 존재할 경우 */
  if (req.session.login) {
    /* mypage_upload를 출력 */
    /* loginState값에 session값을 대입 */
    /* nane값에 session값을 대입 */
    /* image값에 session값을 대입 */
    res.render('mypage_upload', {
      loginState: req.session.login,
      name: req.session.name,
      image: req.session.image
    });
  } else {
    /* session login 값이 없으면 login 페이지로 돌아감 */
    res.redirect('/login');
  }
});
/* 객체 참조로 router 호출을 하면 받는 값 */
module.exports = router;
