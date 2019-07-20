var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// router setting
var apiRouter = require('./routes/api');
// login module
var passport = require('passport');
var passportConfig = require('./routes/passport');

var app = express();



// http, https and certification start
var http = require('http');
var https = require('https');
var fs = require('fs');

app.set('port', 3000);

var options = {
    key: fs.readFileSync('./ssl/private.pem'),
    cert: fs.readFileSync('./ssl/public.pem')
};

var httpsServer = https.createServer(options, app);
httpsServer.listen('3000', function() {
    console.log("https start");
});
// http, https end


// Login module setting start
app.use(session({
  secret: 'abc', 
  resave: true, 
  saveUninitialized: false 
})); // 세션 활성화
app.use(passport.initialize()); // passport 구동
app.use(passport.session()); // 세션 연결
passportConfig(); // passport 모듈 설정
// Login module setting end


// view engine setup
app.set('views', [path.join(__dirname, 'views'), path.join(__dirname, 'dist')]);
//app.set('view engine', 'pug');

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// router path 
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);


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
