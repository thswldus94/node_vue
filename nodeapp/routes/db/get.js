var express = require('express');
var router = express.Router();

// mysql module import
var mysqlCon = require('../../db/dbConn')();
var connection = mysqlCon.init();

router.get('/malware', function(req, res, next) {
    var params = req.query;
    connection.query("select * from MALWARE_INFO", function(err, result, fields) {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

router.get('/news', function(req, res, next) {
    var params = req.query;

    connection.query("select SQL_CALC_FOUND_ROWS * from social_news order by date desc limit ?, ?", 
        [parseInt(params.offset), parseInt(params.limit)], 
        // 쿼리 가져오는것에 있어서 동기 처리 하기 위하여 설정
        async function(err, result, fields) {
            if (err) {
                console.log(err);
            } else {
                var rows = {
                    count: await countQuery(),
                    data: result
                }
                res.send(rows);
            }
        }
    );
});

router.get('/board', function(req, res, next) {
    var params = req.query;

    connection.query("select SQL_CALC_FOUND_ROWS * from board order by rdate desc limit ?, ?", 
        [parseInt(params.offset), parseInt(params.limit)], 
        // 쿼리 가져오는것에 있어서 동기 처리 하기 위하여 설정
        async function(err, result, fields) {
            if (err) {
                console.log(err);
            } else {
                var rows = {
                    count: await countQuery(),
                    data: result
                }
                res.send(rows);
            }
        }
    );
});

router.get('/board/view/:id', function(req, res, next) {
    var id = req.params.id;

    connection.query("select user.id as uname, board.title as title, board.content as content, \
            board.rdate as rdate, board.udate as udate, board.hit as hit \
            from board left outer join user \
            on board.uid = user.uid where board.id = ?", [id], 
        function(err, result, fields) {
            if (err) {
                console.log(err);
            } else {
                res.send(result[0]);
            }
        }
    );
});

router.get('/todo', function(req, res, next) {
    var id = req.params.id;

    connection.query("select * from todolist", function(err, result, fields) {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

router.get('/todo/:id', function(req, res, next) {
    var id = req.params.id;
    connection.query("select * from todolist where id = ?", [id], function(err, result, fields) {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});


function countQuery() {
    return new Promise((resolve, reject) => {
        connection.query("select found_rows()", [], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result[0]['found_rows()']);
        });
    });
}

module.exports = router;
