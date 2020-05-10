var jwt = require('jsonwebtoken');

exports.generateToken = (req, res) => {
    // 특정 key값을 던지는 경우에만 발급하도록 테스트로 만듬
    // 원래는 지정된 사용자..등등에게 발급해야 하지만
    // 귀찮으니 그건 패스

    const secret = req.app.get('jwt-secret');
    console.log(secret);

    var secretKey = req.body.key;
    console.log(secretKey);

    if (secretKey !== 'sonjiyeonisbest') {
        console.log('key 값 오류');
    } else {
        var token = jwt.sign(
            // payload 데이터
            {
                username: 'test son ji yeon'
            }, 
            // secret key
            secret,
            // option 
            {
                expiresIn: '7d',
                issuer: 'regedit.synology.me:33000',
                subject: 'sonjy token test'
            }
        );
        
        console.log(token);
    }
    

    res.send('this router is working')
}