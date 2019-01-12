var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
 var userlist = require('./');

 module.exports = function(res, screen_name){
    var client = new Twitter({
        consumer_key: '',
        consumer_secret: '',
        access_token_key: '',
        access_token_secret: ''
        });

    app.set('view engine', 'jade');
    app.use(bodyParser.urlencoded({ extended: false }))

    app.get('/', function(req, res) {

        res.render('index');
    });

    app.post('/get_users', function(req, res) {
        var screen_name = req.body.handle;
        var users= userlist(res, screen_name); 
    });

    app.post('/timeline', function(req, res) {
        var screen_name = req.body.handle;
        var users= timeline(res, screen_name); 
     });

    var server = app.listen(3000, function() {
        console.log('Our App is running at http://localhost:3000');
    });
 }