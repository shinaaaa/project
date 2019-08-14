var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  req.session.pw_auth = false;
  if(req.session.login) {
    res.render("pw_auth");
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
