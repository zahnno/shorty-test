var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//url schema for long_urls and shortcodes
var UrlSchema = new Schema({
  long_url: String,
  shortcode: String,
  created_at: Date
});

var Url = mongoose.model('Url', UrlSchema);

module.exports = Url;
