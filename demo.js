/**
 * Created by Henry on 2/5/17.
 */
var nodeScraper = require('./nodeScraper');
var url = 'http://www.hongkongcard.com/forum/5-51?page=1';

nodeScraper(url, function (err, res, $, next) {
  if ($('.forum_list').length > 0) {
    $('.forum_list').each(function (i, elm) {
      var forumList = {
        category: '',
        title: '',
        answer: '',
        reply: '',
        read: ''
      };

      // using cheerio
      forumList.category = $(this).find('.desktop_only .category').find('p').text();
      forumList.link = $(this).find('.left .desktop_only').children().next().find('a').attr('href');
      forumList.title = $(this).find('.left .desktop_only h2').find('a').text();
      forumList.reply = $(this).find('.desktop_only').find('.right').children().first().find('.info').text();
      forumList.read = $(this).find('.desktop_only').find('.right').children().next().find('.info').text();

      // text cleaning
      forumList.title = forumList.title.match(/[\s\t]+(.+?)[\s\\n\n']+$/)[1];
      forumList.reply = forumList.reply.match(/[\s\t]+(.+?)[\s\\n\n']+$/)[1];
      forumList.read = forumList.read.match(/[\s\t]+(.+?)[\s\\n\n']+$/)[1];

      if (forumList.title.length < 3) return;
      next.push(forumList);
    });

    next.writeCSV();
  }
});