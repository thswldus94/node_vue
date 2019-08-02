var express = require('express');
var router = express.Router();

// mysql module import
var mysqlCon = require('../db/dbConn')();
var connection = mysqlCon.init();

// get ip
var ip = require('ip');
// get crypto
var crypto = require('crypto');


router.get('/', function(req, res, next) {
    res.render('index.html');
});

router.get('/:type(dashboard|icons|tables|todo|malwares|maps|profile|login|register)', function(req, res, next) {
    res.render('index.html');
});

router.get('/intro', function(req, res, next) {
    res.render('intro/index.html');
});

module.exports = router;
