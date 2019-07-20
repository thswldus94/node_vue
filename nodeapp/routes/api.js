var express = require('express');
var router = express.Router();
// mysql module import


var passport = require('passport');
var flash = require('connect-flash');
console.log('탔냐?');
// 이미 app.js에서 /api 에 대한 라우터 정의를 해 주었음
// 따라서 /api/login 으로 안쓰고 그냥 /login 만 써도 됨
router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        //console.log(info);
        if (info.state === true) {
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.redirect('/login');
            });
        } else {
            res.send(info.message);
            return next(err);
        }
    })(req, res, next);
});

module.exports = router;