var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res, next) {
    res.render('index.html', {
        title: "Dashboard"
    });
});

router.get('/vue', function(req, res, next) {
    res.render('vuelist.html', {
        title: "Vuejs Practice"
    });
});

// router.get('/test', function(req, res, next) {
//     //res.send('what the?');
//     res.render('test.html', {
//         say: 'what do you want to say?'
//     });
// });

module.exports = router;
