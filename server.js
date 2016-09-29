var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Url = require('./models/url.js');
var encrypted = require('./public/encrypted.js');


//connecting mongodb
// mongoose.connect('mongodb://' + "localhost" + '/' + "shorty");
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://' + "lanepin-shorty-test-3834298" + '/' + "shorty");

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
  
  //assign shortcode if none is present
  if (!shortCode) shortCode = encrypted.encrypt();
  
  //if url is not present in req, respond error
  if (!longUrl) {
    
    res.status(400).send({ error: "url is not present" });
    
  } else {
    
    //fetch url from db using shortcode
    Url.findOne({shortcode: shortCode}, function (err, doc){
      if (doc){//if shortcode is found, respond error
        
       res.status(409).send({error: "The desired shortcode is already in use. Shortcodes are case-sensitive."});
       
      } else if (/^[0-9a-zA-Z_]{4,}$/.test(shortCode) != true) {//if short code doesn't fall into regexp, respond error
        
        res.status(422).send({error: "The shortcode fails to meet the following regexp: ^[0-9a-zA-Z_]{4,}$."});
        
      } else {
        
        //create new url if conditions pass
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
        short_url = "https://shorty-test-lanepin.c9users.io/" + newUrl.shortcode;
        res.send({'shortcode': short_url});
       });
      }
    });
  }
});

//get request for url using shortcode 
app.get('/:short_code', function(req, res){
  var shortcode = req.params.short_code;
 
  Url.findOne({shortcode: shortcode}, function (err, doc){
    console.log(doc.long_url);
    if (doc) {
      res.redirect(doc.long_url);//redirecting to long-url
    } else {
      res.status(404).send({error: "The shortcode cannot be found in the system or url provided is invalid"})//responding with error if shortcode not found
    }
  });
});

//server port opener
var server = app.listen(process.env.PORT, process.env.IP, function(){
  console.log('Server listening on port' + process.env.PORT);
});
