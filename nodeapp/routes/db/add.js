var express = require('express');
var router = express.Router();

// mysql module import
var mysqlCon = require('../../db/dbConn')();
var connection = mysqlCon.init();

var ip = require('ip');
// get crypto
var crypto = require('crypto');

router.post('/todo', function(req, res) {
    var body = req.body;
    connection.query("insert into todolist(title, rdate, udate, ip) values(?, now(), now(), ?)",
        [body.title, ip.address()],
        function(err, result, fields) {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

router.post('/register', function(req, res) {
    var body = req.body;
    var password = crypto.createHash('sha256').update(body.password).digest('base64');
    console.log(password);
    connection.query("insert into user (id, email, password, agree_policy) values (?, ?, ?, ?)",
        [body.id, body.email, password, body.agree],
        function(err, result, fields) {
            console.log(err);
            if (err) {
                res.send({
                    'state' : 0,
                    'code' : err.errno,
                    'msg' : err.sqlMessage
                });
            } else {
                res.send({'state' : 1});
            }
        }
    );
});

router.post('/board', function(req, res) {
    var body = req.body;
    connection.query("insert into board(uid, title, content, file_upload, rdate, udate) \
                        values (?, ?, ?, ?, now(), now())",
        [body.uid, body.title, body.content, body.file_upload],
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
