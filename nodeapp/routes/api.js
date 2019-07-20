var express = require('express');
var router = express.Router();
// mysql module import
var mysqlCon = require('../db/dbConn')();
var connection = mysqlCon.init();
//var bcrypt = require('bcrypt');
// login module
var passport = require('passport');

// get crypto
var crypto = require('crypto');

// 이미 app.js에서 /api 에 대한 라우터 정의를 해 주었음
// 따라서 /api/login 으로 안쓰고 그냥 /login 만 써도 됨
router.post('/login', function(req, res, next) {
    var id = req.body.id;
    var password = req.body.password;

    connection.query("select * from user where id = ?",
        [id],
        function(err, result, fields) {
            if (err) {
                console.log('err :' + err);
            } else {
                if (result.length > 0) {
                    var cryptoPassword = crypto.createHash('sha256').update(password).digest('base64');
                    console.log(cryptoPassword);
                    console.log(result[0].password);

                    //if (!bcrypt.compareSync(password, result[0].password) {
                    if (cryptoPassword !== result[0].password) {
                        res.json({state: false, message: '비밀번호가 일치하지 않습니다.'});
                    } else {
                        passport.authenticate('local', {
                            failureRedirect: '/todo'
                        });
                        res.json({state: true});
                    }
                } else {
                    res.json({state: false, message: '아이디가 존재하지 않습니다.'});
                }
            }
        }
    );
});

module.exports = router;