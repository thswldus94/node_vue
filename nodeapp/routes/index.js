var express = require('express');
var router = express.Router();

// mysql module import
var mysqlCon = require('../db/dbConn')();
var connection = mysqlCon.init();

// get ip
var ip = require('ip');
// get crypto
var crypto = require('crypto');
// login module
// var passport = require('passport');



router.get('/', function(req, res, next) {
    res.render('index.html');
});

router.get('/:type(dashboard|icons|tables|todo|malwares|maps|profile|login|register)', function(req, res, next) {
    res.render('index.html');
});

router.get('/intro', function(req, res, next) {
    res.render('intro/index.html');
});

router.get('/vue', function(req, res, next) {
    var params = req.query;

    // vue basic
    switch (params.step) {
        case 'basic' :
            res.render('./vue/html/basic/vuelist.html', {
                title: "Vuejs Practice STEP Basic"
            });
            break;
        case 'form' :
            res.render('./vue/html/form/vue_form.html', {
                title: "Vuejs Practice STEP Form Control"
            });
            break;
        case 'component' :
            res.render('./vue/html/component/vue_component.html', {
                title: "Vuejs Practice STEP Component Control"
            });
            break;
        case 'cli':
            res.render('./vue/html/cli/vue_cli.html', {
                title: "Vuejs Study STEP Vue cli using Webpack"
            });
            break;
        default:
            res.render('./error/error_404.html', {
                title: "Error 404"
            });
            break;
    }
});

// router.get('/todo', function(req, res, next) {
//     res.render('./todo/html/index.html', {
//         title: "Trello 와 비슷하게 Todo 리스트 만들어볼게요!^^"
//     });
// });
//
// router.get('/test', function(req, res, next) {
//     res.render('./test/index.html', {
// 	title: "Trello 와 비슷하게 Todo 리스트 만들어볼게요!^^"
//     });
// });
//
//
// router.get('/board', function(req, res, next) {
//     res.render('./board/html/list.html', {
//         title: "게시판 만들기!"
//     });
// });
//
// router.get('/boardGet', function(req, res, next) {
//     connection.query("select * from test;", function(err, result, fields) {
//         if (err) {
//             console.log('쿼리에러');
//         } else {
//             res.send(result);
//         }
//     });
// });


router.get('/get', function(req, res, next) {
    var params = req.query;

    // 게시판 모듈일 경우
    switch (params.type) {
        case 'board':
            connection.query("select * from test;", function(err, result, fields) {
                if (err) {
                    console.log('쿼리에러');
                } else {
                    res.send(result);
                }
            });
            break;
        case 'todo':
            connection.query("select * from todolist;", function(err, result, fields) {
                if (err) {
                    console.log('쿼리에러');
                } else {
                    res.send(result);
                }
            });
            break;
    }
});


router.post('/add', function(req, res) {
    var body = req.body;

    // 게시판 모듈일 경우
    switch (body.addType) {
        case 'board':
            connection.query("insert into test values(?,?,?)",
                [body.id, body.name, body.age],
                function(err, result, fields) {
                    if (err) {
                        console.log('쿼리에러');
                    } else {
                        res.redirect('/board');
                    }
                }
            );
            break;
        case 'todo':
            connection.query("insert into todolist(title, rdate, udate, ip) values(?, now(), now(), ?)",
                [body.title, ip.address()],
                function(err, result, fields) {
                    if (err) {
                        console.log('쿼리에러');
                    } else {
                        res.send(result);
                    }
                }
            );
            break;
        case 'register':
            var password = crypto.createHash('sha256').update(body.password).digest('base64');
            console.log(password);
            connection.query("insert into user (id, email, password, agree_policy) values (?, ?, ?, ?)",
                [body.id, body.email, password, body.agree],
                function(err, result, fields) {
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
            break;
    }
});




// router.post('/add/register', function(req, res) {
//     var body = req.body;
//     var password = crypto.createHash('sha256').update(body.password);
//     connection.query("insert into user (id, email, password, agree) values (?, ?, ?, ?)",
//         [body.id, body.email, password, body.agree],
//         function(err, result, fields) {
//             if (err) {
//                 console.log('쿼리에러');
//             } else {
//                 res.send(body);
//             }
//         }
//     );
// });


router.post('/delete', function(req, res) {
    var body = req.body;

    // 게시판 모듈일 경우
    switch (body.deleteType) {
        case 'board':

            break;
        case 'todo':
            connection.query("delete from todolist where id = ?",
                [body.id],
                function(err, result, fields) {
                    if (err) {
                        console.log('쿼리에러');
                    } else {
                        res.send(body);
                    }
                }
            );
            break;
    }
});


router.post('/update', function(req, res) {
    var body = req.body;

    // 게시판 모듈일 경우
    switch (body.updateType) {
        case 'board':

            break;
        case 'todo':
            connection.query("update todolist set title = ?, udate = now(), ip = ? where id = ?",
                [body.title, ip.address(), body.id],
                function(err, result, fields) {
                    if (err) {
                        console.log('쿼리에러');
                    } else {
                        res.send(body);
                    }
                }
            );
            break;
    }
});


router.post('/update/todo/done', function(req, res) {
    var body = req.body;
    connection.query("update todolist set is_done = ? where id = ?",
        [body.is_done, body.id],
        function(err, result, fields) {
            if (err) {
                console.log('쿼리에러');
            } else {
                res.send(body);
            }
        }
    );
});

module.exports = router;
