/**
 * Created by Henry on 2/5/17.
 */
var nodeScraper = require('../lib/nodeScraper');
var url = 'http://www.imdb.com/movies-in-theaters/?ref_=nv_tp_inth_1';

var scraper = new nodeScraper();

scraper.scrape(url, function (err, res, $) {
  if (err) return console.log(err);

  // start cheerio logic from here
  if ($('.list_item').length < 1) return console.log('empty');

  $('.list_item').each(function (i, elm) {

    // have to define csv header
    var movie = {
      name: '',
      link: '',
      rating: 0
    };

    movie.name = $(elm).find('.overview-top h4 a').attr('title').trim();
    movie.link = url + $(elm).find('.overview-top a').attr('href');
    movie.rating = $(elm).find('.metascore').find('strong').text();

    // push the scraper to out csv
    scraper.push(movie);
  });

  // out csv
  scraper.outCSV('movie.csv');
});