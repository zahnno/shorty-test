var should = require('should'); 
var assert = require('assert');
var request = require('supertest');  
var mongoose = require('mongoose');
var app = require('../server.js');
var Url = require('../models/url.js')
var encrypted = require('../public/encrypted.js');

describe('Routes', function() {
  
  before(function (done) {   
    Url.collection.drop();
    done();
  })
  
  describe("get '/'", function() {
    it('should respond with response code 200', function(done) {
      request(app)
        .get('/')
        .expect(200, done);
    });
  });
  
  describe("post '/shorten'", function(){
    var urlExample = 'https://jsbin.com';
    
      var newUrl = {
          url : 'https://jsbin.com',
          shortcode : 'jsbin'
      }
      
      var noCode = {
          url : urlExample
      }
      
      var noRegex = {
          url : urlExample,
          shortcode : 'jsb'
      }
      
      it("should create url with url and shortcode", function(done){
          request(app)
            .post('/shorten')
            .send(newUrl)
            .end(function(err, res){
                res.status.should.be.equal(200);
                res.should.be.json;
                res.body.should.have.property('shortcode');
                done();
            });
      });
      
      it('should create url with url/generate shortcode', function(done){
          request(app)
            .post('/shorten')
            .send(noCode)
            .end(function(err, res){
                res.status.should.be.equal(200);
                res.should.be.json;
                res.body.should.have.property('shortcode');
                done();
            });
      });
      
      it("shouldn't create url without url", function(done){
          request(app)
            .post('/shorten')
            .send()
            .end(function(err, res){
                res.status.should.be.equal(400);
                res.should.be.json;
                done();
            });
      });
      
      it("shouldn't create url without regexp shortcode", function(done){
          request(app)
            .post('/shorten')
            .send(noRegex)
            .end(function(err, res){
                res.status.should.be.equal(422);
                res.should.be.json;
                done();
            });
      });
      
  });
  
  describe("get '/:short_code", function(){
    
     it("should respond with 302 for successful redirect", function(done){
         request(app)
            .get('/jsbin')
            .end(function(err, res){
                res.status.should.be.equal(302);
                done();
            });
     });
     
     it("should respond with 404 for unsuccessful redirect", function(done){
         request(app)
            .get('/jsb')
            .end(function(err, res){
                res.status.should.be.equal(404);
                done();
            });
     });
     
  });
});

describe('Encrypt', function(){
  
    it("should return regexp following ^[0-9a-zA-Z_]{6}$", function(){
      var shortcode = encrypted.encrypt();
      var regex = new RegExp("^[0-9a-zA-Z_]{6}$");
      var res = regex.test(shortcode);
      (res).should.be.exactly(true)
    });
    
    it("generate at least 50 shortcodes without fail", function(){
      var regex = new RegExp("^[0-9a-zA-Z_]{6}$");
      var i = 0
      
      while( i < 50 ){
        var res = regex.test(encrypted.encrypt());
        (res).should.be.exactly(true)       
        i++ 
      }
    });
});

describe('Models', function(){

  describe('Url model', function(){
    
    var newUrl = Url({
      long_url : 'https://jsbin.com',
      shortcode : 'jsbin'
    });
  
    it("should create new url", function(done){
        newUrl.long_url.should.equal('https://jsbin.com');
        newUrl.shortcode.should.equal('jsbin');
        done();
    });
  });
});