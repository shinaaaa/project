/* 외부 모듈 express를 require로 불러와 변수 express로 선언 */
var express = require('express');
/* express의 Router 모듈을 변수 router로 선언 */
var router = express.Router();

/* get 형식으로 라우트 경로를 '/'로 지정함 */
router.get('/', function(req, res, next) {

  /* join 페이지로 렌더링 함 */
  res.render('join');
});

/* 객체 참조로 router 호출을 하면 받는 값 */
module.exports = router;
