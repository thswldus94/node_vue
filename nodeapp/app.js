var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

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

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
