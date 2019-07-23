/* 외부 모듈 express를 require로 불러와 변수 express로 선언 */
var express = require('express');
/* express의 Router 모듈을 변수 router로 선언 */
var router = express.Router();

/* get 형식으로 라우트 경로를 '/'로 지정함 */
router.get('/', function(req, res, next) {
  /* index 페이지에 JSON 형식으로 데이터를 전송하여 로컬 변수로 사용할 수 있도록 렌더링 함 */
  res.render('index', {
    loginState: req.session.login,
    name: req.session.name
  });
});

/* 객체 참조로 router 호출을 하면 받는 값 */
module.exports = router;