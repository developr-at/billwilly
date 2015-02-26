var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var debug = require('debug')('billwilly');

var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/authentication');

var app = express();

var mongoose = require('mongoose');
var dbInit = require('./init/db');

var API_VERSION = 'v1';


mongoose.connect('mongodb://localhost/billwilly');

// initiliazes the database
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  debug('Successfully connected to database ...');
  dbInit.init();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: '14d3efffa613d1b36ac20d9f9f32c48a',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// API routes
app.use('/api/' + API_VERSION + '/auth', auth);
app.use('/api/' + API_VERSION, routes);
app.use('/api/' + API_VERSION  + '/users', users);

// Always render frontend
// @TODO: replace * with valid frontend routes
app.get('*', function (req, res, next) {
    if (req.url !== '/' && req.url.indexOf('/api') !== 0) {
        req.url = '/#' + req.url;
        res.render('index');
    } else {
        next();
    }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
