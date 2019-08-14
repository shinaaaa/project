var express = require('express');
var router = express.Router();

/* POST My Edit page. */

/* router.post('/', function (req, res) {
  if (req.session.login) {
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$');

    res.render('mypage_edit', {
      name: req.session.name,
      email: req.session.email,
      id: req.session.lid,
      birth: req.session.birth,
      image: req.session.image
    });
  } else {
    res.redirect('/login');
  }
}); */


router.get('/', function (req, res) {
  if (req.session.pw_auth) {
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$');

    res.render('mypage_edit', {
      name: req.session.name,
      email: req.session.email,
      id: req.session.lid,
      birth: req.session.birth,
      image: req.session.image
    });
  } else {
    req.session.pw_auth = false;
    res.redirect('/login');
  }
});


module.exports = router;