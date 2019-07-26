var express = require('express');
var router = express.Router();

router.get('/basic', function(req, res, next) {
    res.render('./vue/html/form/vue_form.html');
});

router.get('/form', function(req, res, next) {
    res.render('./vue/html/basic/vuelist.html', {
        title: "Vuejs Practice STEP Basic"
    });    
});

router.get('/component', function(req, res, next) {
    res.render('./vue/html/component/vue_component.html', {
        title: "Vuejs Practice STEP Component Control"
    });   
});

router.get('/cli', function(req, res, next) {
    res.render('./vue/html/cli/vue_cli.html', {
        title: "Vuejs Study STEP Vue cli using Webpack"
    });   
});

module.exports = router;
