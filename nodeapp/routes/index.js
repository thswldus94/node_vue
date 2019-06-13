var express = require('express');
var router = express.Router();

// mysql module import
var mysqlCon = require('../db/dbConn')();
var connection = mysqlCon.init();


router.get('/', function(req, res, next) {
    res.render('index.html', {
        title: "Dashboard"
    });
});

router.get('/vue', function(req, res, next) {
    res.render('vuelist.html', {
        title: "Vuejs Practice"
    });
});

router.get('/board', function(req, res, next) {
    res.render('./board/html/list.html', {
        title: "게시판 만들기!"
    });
});

router.get('/boardGet', function(req, res, next) {
    connection.query("select * from test;", function(err, result, fields) {
        if (err) {
            console.log('쿼리에러');
        } else {
            res.send(result);
        }
    });
});


module.exports = router;
