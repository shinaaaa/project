var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.pw_auth = false;
  if(req.session.login) {
    res.redirect("/mypage2")
  } else {
  res.render('find_idpw', {
    id: req.session.find_id,
    id_login: req.session.id_login,
    pw_login: req.session.pw_login,
  });
}
});

module.exports = router;
