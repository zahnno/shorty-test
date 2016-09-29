var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

//require body requests to json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//joining public folder
app.use(express.static(path.join(__dirname, 'public')));

//server port opener
var server = app.listen(8000, function(){
  console.log('Server listening on port ' + 8000);
});
