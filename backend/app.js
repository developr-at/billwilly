var express = require('express');
var session = require('express-session');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var debug = require('debug')('billwilly');

// Load Route Definitions
var users = require('./routes/users');
var auth = require('./routes/authentication');

var mongoose = require('mongoose');
var sequelize = require('./db/sequelize');
var dbInit = require('./db/init');

module.exports = (function () {
    'use strict';

    var API_VERSION = 'v1';

    var app = express();

    initializeDatabase();
    enableCrossDomainRequests();
    initializeMisc();
    initializeAuthentication();
    initializeApiRoutes();
    initializeRouteHandling();

    return app;

    ///////////////////////////////////////////////////////////////////////////

    function initializeDatabase() {
        dbInit.init();
    }

    function enableCrossDomainRequests() {
        app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
            next();
        });
    }

    function initializeMisc() {
        app.use(logger('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(cookieParser());
        app.use(session({
            secret: '14d3efffa613d1b36ac20d9f9f32c48a',
            resave: false,
            saveUninitialized: true
        }));
    }

    function initializeAuthentication() {
        app.use(passport.initialize());
        app.use(passport.session());
    }

    function initializeApiRoutes() {
        app.use('/api/' + API_VERSION + '/auth', auth);
        app.use('/api/' + API_VERSION  + '/users', users);
    }

    function initializeRouteHandling() {
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
    }

})();
