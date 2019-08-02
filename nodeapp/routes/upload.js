var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer({ dest : 'uploads/' });

//router.post('/board', upload.array('files', 10), function(req, res, next) {
router.post('/board', upload.single('file'), function(req, res, next) {
    //console.log(req.file);
    res.send(req.file); // object를 리턴함
    //console.log(req.files); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.
});

module.exports = router;
