var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var session = require('express-session');
var sequelize = require('./models').sequelize;

var app = express();
sequelize.sync();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('도림'));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: '도림',
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 10
    }, rolling: true
}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'upload')));
// 사용자에게 제공하는 HTML 코드에 이 사이트 키: 6LfavrEUAAAAAEEovt1AVjV7y_NcqathHWYFaORZ
// reCAPTCHA의 커뮤니케이션을 위해 이 비밀 키: 6LfavrEUAAAAAIiO7qag7Xquy4HTYpAS58Hx3Jcg

app.use('/', require('./routes/index'));

app.use('/login', require('./routes/login'));
app.use('/login_db', require('./routes/login_db'));
app.use('/logout', require('./routes/logout'));

app.use('/join', require('./routes/join'));
app.use('/join_db', require('./routes/join_db'));
app.use('/join_db2', require('./routes/join_db2'));
app.use('/join_db3', require('./routes/join_db3'));
/* app.use('/mypage2', require('./routes/mypage2')); */

app.use('/find_idpw', require('./routes/find_idpw'));
app.use('/find_idpw_db', require('./routes/find_idpw_db'));
app.use('/find_session', require('./routes/find_session'));

app.use('/pw_auth', require('./routes/pw_auth'));
app.use('/edit_pw_db', require('./routes/edit_pw_db'));

app.use('/mypage_edit', require('./routes/mypage_edit'));
app.use('/mypage_upload', require('./routes/mypage_upload'));
app.use('/mypage_confirm', require('./routes/mypage_confirm'));

app.use('/edit_db', require('./routes/edit_db'));
app.use('/delete_db', require('./routes/delete_db'));
app.use('/post_db', require('./routes/post_db'));
app.use('/mypage2', require('./routes/mypage_posting_db'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render("error")
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error1');
});

module.exports = app;
