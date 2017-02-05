/**
 * Created by Henry on 2/5/17.
 */

var should = require('chai').should(),
  nodeScraper = require('../nodeScraper');

describe('nodeScraper start scrape', function(){
  this.timeout(5000);

  it('should return cheerio', function(done){
    nodeScraper('http://www.yahoo.com/', function(err, res, $, next){
      $.should.be.an('function');
      done();
    })
  });
});