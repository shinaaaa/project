/* express 라이브러리를 호출하여 express 로 선언 */
var express = require('express');

const mysql = require('mysql');

/* 클라이언트와 인터페이스 간의 통신을 위하여
express.Router() 를 router 로 선언 */
var router = express.Router();

/* post 방식으로 호출된 router를 처리 */
router.post('/', function(req, res, next) {
    console.log('세션 ID : ', req.sessionID);   



    let con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'mysqlmysql',
        database: 'project'
    });


    con.connect((err) => {
        if (err) {
            return console.error(err.message);
        }

        console.log("DB연결됨");
        const sql=`insert into users(db_business_num, db_id, db_pw) values("${req.body.join_business_num}", "${req.body.join_id}", "${req.body.join_pw}")`
        console.log(sql);
        
        con.query(sql,(err, result, fields)=> {
            if(err) {
                console.error(err.message);
                res.json(JSON.stringify(result));
            } else {
                console.log(result, fields);
                result.msg = { msg: `${req.body.name} 님 가입 되었습니다.` };
                res.json(JSON.stringify(result.msg));
            }
            con.end();
        })
    });




    const result = { msg: `${req.body.join_id} 님 가입 되었습니다.` };

    /* result 값을 json 형태로 리턴 */
    /* res.json(JSON.stringify(result)); */
});

/* router 의 객체를 모듈로 리턴 */
module.exports = router;