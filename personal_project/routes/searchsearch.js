/* express 라이브러리를 호출하여 express 로 선언 */
var express = require('express');

/* 클라이언트와 인터페이스 간의 통신을 위하여
express.Router() 를 router 로 선언 */
var router = express.Router();

/* post 방식으로 호출된 router를 처리 */
router.post('/', function(req, res, next) {
    console.log('세션 ID : ', req.sessionID);

    /* 클라이언트의 find_db_product 값을 세션의 find_db_product 에 전달 */
    req.session.find_db_product = req.body.find_db_product;

    /* 클라이언트의 find_db_origin 값을 세션의 find_db_origin 에 전달 */
    req.session.find_db_origin = req.body.find_db_origin;

    /* 클라이언트의 find_db_Date_of_Manufacture 값을 세션의 find_db_Date_of_Manufacture 에 전달 */
    req.session.find_db_Date_of_Manufacture = req.body.find_db_Date_of_Manufacture;

    /* searchdatapage.ejs로 요청의 경로를 재지정 */
    res.redirect('/searchdatapage');
});

/* router 의 객체를 모듈로 리턴 */
module.exports = router;