var express = require('express');
var router = express.Router();

// mysql module import
var mysqlCon = require('../../db/dbConn')();
var connection = mysqlCon.init();

var ip = require('ip');

router.post('/malware', function(req, res, next) {
    var params = req.query;

});

router.post('/todo/:id', function(req, res, next) {
    var id = req.params.id;
    console.log(id);
    var body = req.body;
    connection.query("update todolist set title = ?, udate = now(), ip = ? where id = ?",
        [body.title, ip.address(), id],
        function(err, result, fields) {
            if (err) {
                console.log(err);
            } else {
                res.send(body);
            }
        }
    );
});

router.post('/todo/done/:id', function(req, res) {
    var id = req.params.id;
    var body = req.body;
    connection.query("update todolist set is_done = ? where id = ?",
        [body.is_done, id],
        function(err, result, fields) {
            if (err) {
                console.log(err);
            } else {
                res.send(body);
            }
        }
    );
});

router.post('/board/:id', function(req, res) {
    var id = req.params.id;
    var body = req.body;
    connection.query("update board set title = ?, content = ?, udate = now() where id = ?",
        [body.title, body.content, id],
        function(err, result, fields) {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

module.exports = router;
