var express = require('express'),
  path = require('path'),
  log4js = require('log4js'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  router = require('./router');


var app = express();

app.disable('x-powered-by');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(cookieParser());
app.use(log4js.connectLogger(
  log4js.getLogger('ims'),
  {
    level: 'INFO',
    format: ':method ":url" :status :res[Content-Length] :response-time'
  }
));
app.use(express.static(path.join('', 'public')));

app.use(router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
router.get('/', function (req, res){
  res.redirect("/website/website.html")
});


module.exports = app;
