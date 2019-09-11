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
    console.log(req.user);
    connection.query("select SQL_CALC_FOUND_ROWS board.id, user.id as user, user.uid as uid, title, content, hit, rdate, udate \
        from board left outer join user on board.uid = user.uid \
        order by rdate desc limit ?, ? \
    ", 
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

    connection.query("select user.id as uname, user.uid as uid, board.title as title, board.content as content, \
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

router.get('/stat', function(req, res, next) {
    connection.query("select (select count from stat_news order by rdate desc limit 1) as count, \
                    (select count from stat_news order by rdate desc limit 1, 1) as yester_count, \
                    t1.cpu_usage, t1.memory_usage, t1.disk_usage from system_info t1 \
                    order by t1.rdate desc limit 2", function(err, result, fields) {
        if (err) {
            console.log(err);
        } else {
            var countAverage = (result[0]['count'] + result[0]['yester_count']) / 2;
            var cpuAverage = (result[0]['cpu_usage'] + result[1]['cpu_usage']) / 2;
            var memAverage = (result[0]['memory_usage'] + result[1]['memory_usage']) / 2;
            var diskAverage = (result[0]['disk_usage'] + result[1]['disk_usage']) / 2;

            var newsPer = countAverage > 0 ? result[0]['count'] / countAverage * 100 : 0.00;
            var cpuPer = cpuAverage > 0 ? result[0]['cpu_usage'] / cpuAverage * 100 : 0.00;
            var memPer = memAverage > 0 ? result[0]['memory_usage'] / memAverage * 100 : 0.00;
            var diskPer = diskAverage > 0 ? result[0]['disk_usage'] / diskAverage * 100 : 0.00;

            var stats = {
                'newsCount' : result[0]['count'],
                'yesterNewsCount' : result[0]['yester_count'],
                'newsPer' : newsPer.toFixed(2),
                'newsArrow' : result[0]['count'] > result[0]['yester_count'] ? 'up' : 'down',
                'cpu' : result[0]['cpu_usage'],
                'cpuPer' : cpuPer.toFixed(2),
                'cpuArrow' : result[0]['cpu_usage'] > result[1]['cpu_usage'] ? 'up' : 'down',
                'mem' : result[0]['memory_usage'],
                'memPer' : memPer.toFixed(2),
                'memArrow' : result[0]['memory_usage'] > result[1]['memory_usage'] ? 'up' : 'down',
                'disk' : result[0]['disk_usage'],
                'diskPer' : diskPer.toFixed(2),
                'diskArrow' : result[0]['disk_usage'] > result[1]['disk_usage'] ? 'up' : 'down'
            };
            res.send(stats);
        }
    });
});

router.get('/stat/system', function(req, res, next) {
    var type = req.params.type;
    connection.query("SELECT UNIX_TIMESTAMP(rdate) as rdate, memory_usage, cpu_usage FROM system_info limit 10", function(err, result, fields) {
        if (err) {
            console.log(err);
        } else {
            var stat = {
                'cpu' : [],
                'mem' : []
            };
            for (var i = 0; i < result.length; i++) {
                stat.mem.push({
                    x : result[i].rdate * 1000,
                    y : result[i].memory_usage
                });

                stat.cpu.push({
                    x : result[i].rdate * 1000,
                    y : result[i].cpu_usage
                });
            }

            res.send(stat);
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
