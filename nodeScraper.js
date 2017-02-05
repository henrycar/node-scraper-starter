/**
 * Created by Henry on 2/5/17.
 * Easy scraper start for scraping usage
 */

var async = require('async'),
  cheerio = require('cheerio'),
  request = require('request'),
  fs = require('fs'),
  csv = require('fast-csv');

var objArr = [];

nodeScraper = function(url, cb){
  var next = {};
  next.push = push;
  next.writeCSV = writeCSV;

  request(url, function(err, res, body){
    if(err) cb(err);

    cb(null, res, cheerio.load(body), next);
  });
};

push = function(data){
  objArr.push(data)
};

writeCSV = function(filename){
  filename = filename || 'my.csv';
  csv.writeToPath(filename, objArr, {headers: true})
    .on("finish", function () {
      console.log("done!");
    });
};

module.exports = nodeScraper;