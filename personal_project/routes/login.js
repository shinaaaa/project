/* express 라이브러리를 호출하여 express 로 선언 */
var express = require('express');

/* 클라이언트와 인터페이스 간의 통신을 위하여
express.Router() 를 router 로 선언 */
var router = express.Router();

/* post 방식으로 호출된 router를 처리 */
router.post('/', function(req, res, next) {
    console.log('세션 ID : ', req.sessionID);

    /* 클라이언트의 login_login_business_num 값을 세션의 login_login_business_num 에 전달 */
    req.session.login_login_business_num = req.body.login_login_business_num;

    /* 클라이언트의 login_login_id 값을 세션의 login_login_id 에 전달 */
    req.session.login_login_id = req.body.login_login_id;

    /* 클라이언트의 login_login_pw 값을 세션의 login_login_pw 에 전달 */
    req.session.login_login_pw = req.body.login_login_pw;

    /* 세션의 loginState 값에 세션의 true 전달 */
    req.session.loginState = true;

    /* index.ejs로 요청의 경로를 재지정 */
    res.redirect('/');
});

/* router 의 객체를 모듈로 리턴 */
module.exports = router;