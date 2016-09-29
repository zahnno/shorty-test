var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Url = require('./models/url.js');

//setting up mongodb
mongoose.connect('mongodb://' + "localhost" + '/' + "shorty");

//require body requests to json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//joining public folder
app.use(express.static(path.join(__dirname, 'public')));

//homepage route
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

//post request to create a shortcoded url
app.post('/shorten', function(req, res){
    var longUrl = req.body.url;
    var shortCode = req.body.shortcode;
    
    var newUrl = Url({
        long_url: longUrl,
        shortcode: shortCode
    });
    
    res.send({'shortcode': newUrl.shortcode});
});

app.get('/:short_code', function(req, res){

});

//server port opener
var server = app.listen(8000, function(){
    console.log('Server listening on port ' + 8000);
});
