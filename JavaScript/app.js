var cookieSession = require('cookie-session');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();

require('colors');


//  Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Live-Design', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`Database connected sucessfully`.green);
},
    error => {
    console.log(`Could not connected to database : ${error}`.red);
});

//  Globals
global.version = JSON.parse(fs.readFileSync("package.json", "utf8")).version;
global.root_path = path.resolve(__dirname + "/../");
global.port = 80 || process.env.port;

//  Static Folders
app.use('/Ace', express.static(path.resolve(global.root_path + '/JavaScript/Ace')));
app.use('/JavaScript', express.static(path.resolve(global.root_path + '/JavaScript/Client')));
app.use('/CSS', express.static(path.resolve(global.root_path + '/CSS')));

//  Favicon
// app.use(favicon('favicon.ico'))
//  View Engine
app.set('views', path.resolve(global.root_path + '/views'));
app.set('view engine', 'ejs');
app.set('Layout', 'Views/Layout');
var engine = require('ejs-locals');
app.engine('ejs', engine);

//  Body Parser - JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//  Sessions / Cookies
app.set('trust proxy', 1);
app.use(cookieSession({
    name: 'session',
    secret: 's3cr3t21',
    httpOnly: true,
    maxAge: Date.now() + (10 * 365 * 24 * 60 * 60),
    secure: false,
    overwrite: false,
    cookie: {
        httpOnly: true,
        sameSite: true,
        maxAge: Date.now() + (10 * 365 * 24 * 60 * 60)
    }
}));

app.use(session({
    secret: 's3cr3t21',
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
        sameSite: true,
        maxAge: Date.now() + (10 * 365 * 24 * 60 * 60)
    }
}));

//  Cors - 
app.use(require('cors')({
    origin: [
    "http://localhost"
    ], credentials: true
}));
  
app.use('/', require('../Routes')());

//  Error Handling
app.use(function(req, res, next){   // 404 not found error
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error.ejs', {title: "Error", error: err});
});

app.listen(global.port, function(){
    console.log(`Server listening on port: ${global.port}`.cyan);
});