/* express 라이브러리를 호출하여 express 로 선언 */
var express = require('express');

/* 클라이언트와 인터페이스 간의 통신을 위하여
express.Router() 를 router 로 선언 */
var router = express.Router();

/* post 방식으로 호출된 router를 처리 */
router.post('/', function(req, res, next) {
    console.log('세션 ID : ', req.sessionID);

    const result = { msg: `${req.body.product_name} 등록되었습니다.` };

    /* result 값을 json 형태로 리턴 */
    res.json(JSON.stringify(result));
});

/* router 의 객체를 모듈로 리턴 */
module.exports = router;