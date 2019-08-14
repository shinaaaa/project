const express = require('express');
var User = require('../models').User;
const router = express.Router();

router.post('/', function (req, res) {
  User.findAll({
    attributes: ['db_id'],
    where: {
      db_id: req.body.join_id,
    }
  }).then((result) => {
    if (result != "") {
      res.json(JSON.stringify(`${req.body.join_id}은 사용할 수 없습니다. 다른 ID를 입력해주세요.`));
    } else {
      res.json(JSON.stringify(`${req.body.join_id}은 사용 가능합니다.`));
    }
  }).catch((err) => {
    console.error("err : " + err);
    res.redirect('/');
  });
});

module.exports = router;