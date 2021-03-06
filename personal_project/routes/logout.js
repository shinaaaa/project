/* express 라이브러리를 호출하여 express 로 선언 */
var express = require('express');

/* 클라이언트와 인터페이스 간의 통신을 위하여
express.Router() 를 router 로 선언 */
var router = express.Router();

/* get 방식으로 호출된 router를 처리 */
router.get('/', function(req, res, next) {
    console.log(req.session.login_login_id);

    /* 세션에 login_login_id 값이 존재할 경우 */
    if (req.session.login_login_id) {

        /* 세션 값을 삭제 */
        req.session.destroy(function(err) {

            /* index.ejs로 요청의 경로를 재지정 */
            res.redirect('/');
        });
    }
});

/* router 의 객체를 모듈로 리턴 */
module.exports = router;