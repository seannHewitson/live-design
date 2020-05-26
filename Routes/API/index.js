const UUID = require('uuid/v1');
var router = require('express').Router();
let Projects = require('../../Models/Projects');

module.exports = function(){
    router.get('/', function(req, res){
        res.send({
            Error: 'You have not specified an endpoint.'
        });
    });

    router.post('/Create', function(req, res){
        Projects.findOne({
            SessionID: req.session.sessionID
        }, function(error, obj){
            if(error)   return res.json({success: 0, error: error});
            if(obj)     return res.json({success: 0, error: `Project ${obj.Title} Already Exists`});
            Projects.create({
                SessionID: req.session.sessionID,
                Title: req.body.title,
                CSS: req.body.css,
                HTML: req.body.html,
                DateCreated: new Date()
            }, function(err, data){
                if(err) return res.json({success: 0, error: err});
                res.json({success: 1, message: `Successfully created project: ${data.Title}`});
            });
        });
    });

    router.post('/Update/CSS', function(req, res){
        Projects.findOne({
            SessionID: req.session.sessionID
        }, function(error, obj){
            if(error)   return res.json({success: 0, error: error});
            if(obj){
                //  Update
                Projects.updateOne({
                    _id: obj._id
                }, {
                    $set: { CSS: req.body.value }
                }, function(err, result){
                    if(err) return res.json({success: 0, error: err});
                    req.session.css
                    res.json({success: 1, message: `Updated CSS for Project: ${obj.Title}`});
                });
            } else
                res.json({success: 0, error: 'Could not find Project'});
        });
    });

    router.post('/Update/HTML', function(req, res){
        Projects.findOne({
            SessionID: req.session.sessionID
        }, function(error, obj){
            if(error)   return res.json({success: 0, error: error});
            if(obj){
                //  Update
                Projects.updateOne({
                    _id: obj._id
                }, {
                    $set: { HTML: req.body.value }
                }, function(err, result){
                    if(err) return res.json({success: 0, error: err});
                    res.json({success: 1, message: `Updated HTML for Project: ${obj.Title}`});
                });
            } else
                res.json({success: 0, error: 'Could not find Project'});
        });
    });

    router.post('/Update/JavaScript', function(req, res){
        Projects.findOne({
            SessionID: req.session.sessionID
        }, function(error, obj){
            if(error)   return res.json({success: 0, error: error});
            if(obj){
                //  Update
                Projects.updateOne({
                    _id: obj._id
                }, {
                    $set: { JavaScript: req.body.value }
                }, function(err, result){
                    if(err) return res.json({success: 0, error: err});
                    res.json({success: 1, message: `Updated JavaScript for Project: ${obj.Title}`});
                });
            } else
                res.json({success: 0, error: 'Could not find Project'});
        });
    });

    router.post('/Update/Title', function(req, res){
        Projects.findOne({
            SessionID: req.session.sessionID
        }, function(error, obj){
            if(error)   return res.json({success: 0, error: error});
            if(obj){
                //  Update
                Projects.updateOne({
                    _id: obj._id
                }, {
                    $set: { Title: req.body.value }
                }, function(err, result){
                    if(err) return res.json({success: 0, error: err});
                    res.json({success: 1, message: `Updated Title for Project: ${obj.Title}`});
                });
            } else
                res.json({success: 0, error: 'Could not find Project'});
        });
    });

    return router;
};