const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//const Users = require('./user');
// const cookieSession = require('cookie-session');
// const flash = require('connect-flash');

module.exports = function() {
    // Strategy 성공 시 호출됨
    // 아래에서 실행하여 성공한 done(null, user)의 user 객체를 전달받음
    // 세션 (req.session.passport.user) 에 저장함.
    passport.serializeUser(function(user, done) {
        console.log('success 1');
        // 이 user가 desrializeUser의 첫번째 매개변수로 이동됨
        done(null, user);
    });

    // 매개변수 user는 serializeUser의 done 인자 user를 받은 것
    // 서버로 요청이 들어올 때마다 세션정보를 실제 DB데이터랑 비교함
    // 있으면 user에 저장함.
    passport.deserializeUser(function(user, done) {
        console.log(user);
        // dl user가 req.user가 됨
        done(null, user);
    });

    passport.use(new LocalStrategy({
        usernameField: 'id', // form필드명
        passwordField: 'password', // form필드명
        session: true, // 세션에 저장 여부
        passReqToCallback: false,
    }, function(id, password, done) {
        // // id존재하는지 찾고 없으면 ㅂㅂ
        // Users.findOne({id:id}, function(findError, user) {
        //     if (findError) return done(findError); // 서버에러처리
        //     if (!user) return done(null, false, { message : '존재하지 않는 아이디입니다.'});
        //     return user.comparePassword(password, function(passError, isMatch) {
        //         if (isMatch) {
        //             return done(null, user);
        //         }
        //         // done함수
        //         // 첫번째 인자 : 무조건 실패했을 때 넣음 서버에러 등
        //         // 두번째 인자 : 성공했을 때 리턴하는 값
        //         // 세번째 인자 : 임의로 내가 실패로 만들고 메시지 저장할 때
        //         return done(null, false, {message: '비밀번호가 틀립니다'});
        //     })
        // });
        if (id === 'admin' && password === 'admin123') {
            return done(null, {
              'id': id,
            });
        } else{
            return done(false, null)
        }
    }));
}