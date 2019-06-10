var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res, next) {
    res.render('index.html');
});

router.get('/insert', function(req, res, next) {
    res.render('form.html');
});

// router.get('/test', function(req, res, next) {
//     //res.send('what the?');
//     res.render('test.html', {
//         say: 'what do you want to say?'
//     });
// });

module.exports = router;
