/* express 라이브러리를 호출하여 express 로 선언 */
var express = require('express');

/* 클라이언트와 인터페이스 간의 통신을 위하여
express.Router() 를 router 로 선언 */
var router = express.Router();

/* get 방식으로 호출된 router를 처리 */
router.get('/', function(req, res, next) {
    console.log('세션 ID qqweqweqwew: ', req.sessionID);

    /* searchdatapage 에 함수 값을 가지고 보기 템플리트를 렌더링 */
    res.render('searchdatapage', {
        find_db_product: req.session.find_db_product,
        find_db_origin: req.session.find_db_origin,
        find_db_Date_of_Manufacture: req.session.find_db_Date_of_Manufacture,
    });
});

/* router 의 객체를 모듈로 리턴 */
module.exports = router;