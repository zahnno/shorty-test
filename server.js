var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');


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
    console.log(req.body.url);
    res.send({'shortcode': 'response recieved'});
});

app.get('/:short_code', function(req, res){

});

//server port opener
var server = app.listen(process.env.PORT, process.env.IP, function(){
  console.log('Server listening on port ' + 8000);
});
