/* express 라이브러리를 호출하여 express 로 선언 */
var express = require('express');

/* 클라이언트와 인터페이스 간의 통신을 위하여
express.Router() 를 router 로 선언 */
var router = express.Router();

/* post 방식으로 호출된 router를 처리 */
router.post('/', function(req, res, next) {
    console.log('세션 ID : ', req.sessionID);

    /* 클라이언트의 find_find_business_num 값을 세션의 find_find_business_num 에 전달 */
    req.session.find_find_business_num = req.body.find_find_business_num;

    /* 클라이언트의 find_find_id 값을 세션의 find_find_id 에 전달 */
    req.session.find_find_id = req.body.find_find_id;

    /* 클라이언트의 find_find_pw 값을 세션의 find_find_pw 에 전달 */
    req.session.find_find_pw = req.body.find_find_pw;

    /* 세션의 findState 에 true 전달 */
    req.session.findState = true;
    console.log("----------------- : " + req.session.find_find_pw);

    /* find_user.ejs로 요청의 경로를 재지정 */
    res.redirect('/find_user');
});


/* router 의 객체를 모듈로 리턴 */
module.exports = router;