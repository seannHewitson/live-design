var router = require('express').Router();

module.exports = function(){
    router.get('/', function(req, res){
        res.send({
            Error: 'You have not specified an endpoint.'
        });
    });

    return router;
};