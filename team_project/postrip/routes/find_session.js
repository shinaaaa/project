/* 외부 모듈 express를 require로 불러와 변수 express로 선언 */
var express = require('express');
/* express의 Router 모듈을 변수 router로 선언 */
var router = express.Router();

/* get 형식으로 라우트 경로를 '/'로 지정함 */
router.post('/', function(req, res, next) {
      /* 세션에 login_login_id 값이 존재하거나 req.session.pw_login 값이 존재할 경우 */
      if (req.session.id_login || req.session.pw_login) {
        /* 세션 값을 삭제 */
        req.session.destroy(function(err) {
            /* 요청 경로를 '/'로 재지정함 */
            res.redirect('/');
        });
    }
});
/* 객체 참조로 router 호출을 하면 받는 값 */
module.exports = router;
