/* express 라이브러리를 호출하여 express 로 선언 */
var express = require('express');

/* models 모듈에서 Product 모델을 호출하여 Product 로 선언 */
var Product = require('../models').Product;

/* 클라이언트와 인터페이스 간의 통신을 위하여
express.Router() 를 router 로 선언 */
var router = express.Router();

/* post 방식으로 호출된 router를 처리 */
router.post('/', function(req, res, next) {

    /* Product 테이블의 데이터를 가져오는 SQL문 */
    Product.findAll({
            /* db_product, db_origin, db_Date_of_Manufacture 값을 가져옴 */
            attributes: ['db_product', 'db_origin', 'db_Date_of_Manufacture'],

            /* 조건과 값이 일치하는 경우 */
            where: { db_product: req.body.search_val }
        })
        /* 조회 성공시 */
        .then((result) => {
            console.log("result : " + result);

            /* result 값을 json 형태로 리턴 */
            res.json(JSON.stringify(result));
        })
        /* 조회 실패시 */
        .catch((err) => {
            console.error("err : " + err);
            next(err);
        });
});

/* router 의 객체를 모듈로 리턴 */
module.exports = router;