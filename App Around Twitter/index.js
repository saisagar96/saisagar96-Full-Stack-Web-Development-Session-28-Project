var express = require('express');
var app = express();
var bodyParser = require('body-Parser');
// var userlist = require('./user-list1');
var timelinedata = require('./timeline')
var friendslist = require('./friends');
var followerslist = require('./followers');
;

var screen_name = 'nodejs';

console.log(screen_name);

//module.exports = function(res, screen_name){


    app.set('view engine', 'jade');
    // app.use(bodyParser.urlencoded({ extended: false }))
    app.use(express.static('public'));

    app.get('/', function(req, res) {

        res.render('index');
    });

    app.post('/get_timeline', function(req, res) {
        // res.send('I am from profile page');
        // var screen_name = req.body.handle;
        var timeline = timelinedata(res, screen_name);
    });

    app.post('/get_followers', function(req, res) {
        // res.send('Following');
        // var screen_name = req.body.handle;
        var followers = followerslist(res, screen_name);
    });

    app.post('/get_friends', function(req, res) {
        // res.send('Friends');
         var friends= friendslist(res, screen_name);
    });

    var server = app.listen(3001, function() {
        console.log('App connected to http://localhost:3001');
    });
// }