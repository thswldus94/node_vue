const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

var mysqlCon = require('../db/dbConn')();
var connection = mysqlCon.init();

// get crypto
var crypto = require('crypto');

module.exports = function() {
    // Strategy 성공 시 호출됨
    // 아래에서 실행하여 성공한 done(null, user)의 user 객체를 전달받음
    // 세션 (req.session.passport.user) 에 저장함.
    passport.serializeUser(function(user, done) {
        // 이 user가 desrializeUser의 첫번째 매개변수로 이동됨
        done(null, user);
    });

    // 매개변수 user는 serializeUser의 done 인자 user를 받은 것
    // 서버로 요청이 들어올 때마다 세션정보를 실제 DB데이터랑 비교함
    // 있으면 user에 저장함.
    passport.deserializeUser(function(user, done) {
        // dl user가 req.user가 됨
        console.log(user);
        done(null, user);
    });

    passport.use(new LocalStrategy({
        usernameField: 'id', // form필드명
        passwordField: 'password', // form필드명
        session: true, // 세션에 저장 여부
        passReqToCallback: false,
    }, function(id, password, done) {
        connection.query("select * from user where id = ?",
            [id],
            function(err, result, fields) {
                if (err) {
                    console.log('err :' + err);
                    return done(false, null);
                } else {
                    //console.log(result);
                    if (result.length > 0) {
                        var cryptoPassword = crypto.createHash('sha256').update(password).digest('base64');

                        if (cryptoPassword !== result[0].password) {
                            return done(false, null, {state: false, message: '비밀번호가 일치하지 않습니다.'});;
                        } else {
                            return done(null, {
                                'id': id,
                                'email' : result[0].email
                            }, {state: true});
                        }
                    } else {
                        return done(false, null, {state: false, message: '아이디가 존재하지 않습니다.'});
                    }
                }
            }
        );
    }));
}