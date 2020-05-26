var fs = require('fs');
var path = require('path');
const UUID = require('uuid/v1');
var router = require('express').Router();
let Projects = require('../Models/Projects');

module.exports = function(){
    router.get('/', function(req, res){
        req.session.sessionID = req.session.sessionID || UUID();
        Projects.findOne({
            SessionID: req.session.sessionID
        }, function(error, data){
            if(error)
                return res.render('Error', {title: "Error", error: err});
            if(data){
                req.session.CSS = data.CSS;
                req.session.HTML = data.HTML;
                req.session.JavaScript = data.JavaScript;
                
                return res.render('Index', {
                    title: data.Title,
                    CSS: req.session.CSS,
                    HTML: req.session.HTML,
                    JavaScript: req.session.JavaScript,
                    script: `<script>var projectIsCreated = true;</script>`
                });
            }
            req.session.CSS = fs.readFileSync(path.resolve(global.root_path + '/Defaults/default.css'));
            req.session.HTML = fs.readFileSync(path.resolve(global.root_path + '/Defaults/default.html'));
            req.session.JavaScript = fs.readFileSync(path.resolve(global.root_path + '/Defaults/default.js'));
            
            res.render('Index', {
                title: 'Untitled Project',
                CSS:  req.session.CSS,
                HTML:  req.session.HTML,
                JavaScript: req.session.JavaScript,
                script: `<script>var projectIsCreated = false;</script>`
            }); 
        });
    });

    router.get('/Live-View', function(req, res){
        res.render('View', {
            CSS: req.session.CSS,
            HTML: req.session.HTML,
            JavaScript: req.session.JavaScript
        });
    });

    return router;
};