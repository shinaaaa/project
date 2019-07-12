var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var sequelize = require('./models').sequelize;

var app = express();
sequelize.sync();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine("html", require('ejs').renderFile);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('안녕'));
app.use(session({
  resave: true,  //재할당
  saveUninitialized: false,
  secret: '안녕',
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: (30 * 60 * 1000)
  }
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/index'));
app.use('/join', require('./routes/join'));
app.use('/login', require('./routes/login'));
app.use('/logindb', require('./routes/logindb'));
app.use('/logout', require('./routes/logout'));
app.use('/db', require('./routes/db'));
app.use('/find', require('./routes/find'));
app.use('/find_user', require('./routes/find_user'));
app.use('/find_find', require('./routes/find_find'));
app.use('/findclose', require('./routes/findclose'));
app.use('/searchdata', require('./routes/searchdata'));
app.use('/searchsearch', require('./routes/searchsearch'));
app.use('/searchdatapage', require('./routes/searchdatapage'));
app.use('/enroll', require('./routes/enroll'));
app.use('/db_product', require('./routes/db_product'));
app.use('/enrollproduct', require('./routes/enrollproduct'));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
