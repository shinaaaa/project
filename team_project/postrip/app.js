var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
/* 세션 관리 */
var session = require('express-session');
var sequelize = require('./models').sequelize;

var app = express();

/* 이미 만들어진 데이터베이스 테이블에 모델을 매핑할 수 있을 뿐만 아니라, 정의한 모델을 바탕으로 테이블을 생성(동기화) */
sequelize.sync();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
/* 서버가 HTML 렌더링을 할 때, EJS 엔진을 사용하도록 설정 */
app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('도림'));
app.use(session({
  /* 요청하는 동안 수정이 없다 하더라도 세션은 세션저장공간에 강제적으로 다시 저장 */
    resave: false,
    /* 초기화되지 않은채 스토어에 저장되는 세션 */
    saveUninitialized: false,
    /* 쿠키를 임의로 변조하는것을 방지하기 위한 sign 값 */
    secret: '도림',
    cookie: {
        httpOnly: true,
        secure: false
    }
}))
/* public 정적 파일 설정 */
app.use(express.static(path.join(__dirname, 'public')));
/* upload 정적 파일 설정 */
app.use(express.static(path.join(__dirname, 'upload')));

app.use('/', require('./routes/index'));

app.use('/login', require('./routes/login'));
app.use('/login_db', require('./routes/login_db'));
app.use('/logout', require('./routes/logout'));

app.use('/join', require('./routes/join'));
app.use('/join_db', require('./routes/join_db'));

app.use('/find_idpw', require('./routes/find_idpw'));
app.use('/find_idpw_db', require('./routes/find_idpw_db'));
app.use('/find_session', require('./routes/find_session'));

app.use('/mypage_edit', require('./routes/mypage_edit'));
app.use('/mypage_upload', require('./routes/mypage_upload'));

app.use('/edit_db', require('./routes/edit_db'));
app.use('/delete_db', require('./routes/delete_db'));
app.use('/post_db', require('./routes/post_db'));
app.use('/mypage2', require('./routes/mypage_posting_db'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
