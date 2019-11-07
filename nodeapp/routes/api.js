var express = require('express');
var router = express.Router();
// mysql module import


var passport = require('passport');
var flash = require('connect-flash');
// 이미 app.js에서 /api 에 대한 라우터 정의를 해 주었음
// 따라서 /api/login 으로 안쓰고 그냥 /login 만 써도 됨
router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        //console.log(info);
        if (info.state === true) {
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                //return res.redirect('/');
                res.send({state: true});
                return next();
            });
        } else {
            res.send({
                state: false,
                message: info.message
            });
            return next(err);
        }
    })(req, res, next);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), function(req, res) {
	// console.log(res);
	//res.redirect('https://www.naver.com');
	res.redirect('/');
});

router.get('/session', ensureAuthenticated, function(req, res) {
  // deserilizUser에서 추가로 저장한 정보까지 받음
  var userInfo = req.user;
  //console.log(userInfo);
  res.json(userInfo);
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { // 현재 session이 유효한 세션인지
      // 유효하면 다음으로
      return next();
  } else if (req.user === undefined) {
		res.status(200);
		res.json({});
  } else {
        // 유효하지 않은 경우
        res.status(401);
        res.json({});
  }
}

module.exports = router;