var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.pw_auth = false;
  if(req.session.login) {
    res.redirect("/error");
  } else {
    res.render('join');
  }
});

module.exports = router;
