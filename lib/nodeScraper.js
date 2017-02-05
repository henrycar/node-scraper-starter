/**
 * Created by Henry on 2/5/17.
 * Easy scraper starter for scraping usage
 */

var async = require('async'),
  cheerio = require('cheerio'),
  request = require('request'),
  fs = require('fs'),
  csv = require('fast-csv');

var objArr = [];

nodeScraper = function(url, cb){
  var scraper = {};
  scraper.push = push;
  scraper.outCSV = outCSV;

  request(url, function(err, res, body){
    if(err) return cb(err);

    console.log('scraping: ' + url);
    cb(null, res, cheerio.load(body), scraper);
  });
};

push = function(data){
  objArr.push(data)
};

outCSV = function(filename){
  filename = filename || 'my.csv';
  csv.writeToPath(filename, objArr, {headers: true})
    .on("finish", function () {
      console.log("csv saved!");
    });
};

module.exports = nodeScraper;