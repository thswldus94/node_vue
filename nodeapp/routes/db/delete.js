var express = require('express');
var router = express.Router();

// mysql module import
var mysqlCon = require('../../db/dbConn')();
var connection = mysqlCon.init();

router.post('/malware', function(req, res, next) {
    var params = req.query;
});

router.get('/todo/:id', function(req, res, next) {
    var id = req.params.id;
    connection.query("delete from todolist where id = ?",
        [id],
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
