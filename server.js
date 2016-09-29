var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Url = require('./models/url.js');

//connecting mongodb
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
    var short_url;
    
    //fetch url from db using shortcode
    Url.findOne({shortcode: shortCode}, function (err, doc){
    if (doc){//if shortcode is found, respond error
        
       res.status(409).send({error: "	The desired shortcode is already in use. Shortcodes are case-sensitive."});
       
      } else {
        //create new url
        var newUrl = Url({
         long_url: longUrl,
         shortcode: shortCode
        });
        
        //save url
        newUrl.save(function(err) {
         if (err){
            console.log("Error:" + err);
         }
         
        //pull shortcode, attach domain name, assign to short_url, send it off.
        short_url = "https://locahost:8000/" + newUrl.shortcode;
        res.send({'shortcode': short_url});
       });
      }
    });
});

app.get('/:short_code', function(req, res){

});

//server port opener
var server = app.listen(8000, function(){
    console.log('Server listening on port ' + 8000);
});
