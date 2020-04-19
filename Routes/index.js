var router = require('express').Router();

module.exports = function(){
    router.get('/', function(req, res){
        res.render('Index', {
            title: 'Create'
        });
    });

    router.get('/Live-View', function(req, res){
        var HTML = req.session.HTML || '';
        var CSS = req.session.css || '';
        res.render('View', {
            CSS: CSS,
            HTML: HTML
        });
    });

    return router;
};