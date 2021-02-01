/**
 * superagent 爬虫
 * cheerio dom选择器
 */
let express = require('express');
let router = express.Router();
const superagent = require('superagent');
const cheerio = require('cheerio');

router.get('/', (req, res, next) => {
  let host = 'https://segmentfault.com/'
  superagent.get(host).end((err, data) => {
    if (err) {
      console.log(err)
    } else {
      let arr = []
      let $ = cheerio.load(data.text);
      $('div.news-list .news-item').each((index, ele) => {
        arr.push({
          title: $(ele).find('h4').text(),
          content: $(ele).find('div.article-excerpt').text(),
          url: host + $(ele).find('a').attr('href')
        })
      })
      res.json(arr);
    }
  })
})
module.exports = router;