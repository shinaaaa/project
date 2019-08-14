const express = require('express');
var User = require('../models').User;
const router = express.Router();

router.post('/', function (req, res) {
  User.findAll({
    attributes: ['db_email'],
    where: {
      db_email: req.body.join_email,
    }
  }).then((result) => {
    if (result != "") {
      res.json(JSON.stringify(`${req.body.join_email}은 사용할 수 없습니다. 다른 Email을 입력해주세요.`));
    } else {
      res.json(JSON.stringify(`${req.body.join_email}은 사용 가능합니다.`));
    }
  }).catch((err) => {
    console.error("err : " + err);
    res.redirect('/');
  });
});

module.exports = router;