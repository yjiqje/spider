/**
 * nightmare 自动化爬虫
 */
let express = require('express');
let router = express.Router();
const Nightmare = require('nightmare')

router.get('/', (req, res, next) => {
  const nightmare = Nightmare()
  const HOST = 'https://cas.bcjgy.com/login?service=https%3A%2F%2Fgateway.bcjgy.com%2Fec%2Ffes%2Fsys%2Flogin%2Fredirect'
  nightmare
    .goto(HOST)
    .wait('#static-login')
    .type('#credential', '18618305662')
    .type('#password', 'aaaaaa')
    .click('.input-box.input-btn button')
    .wait('#org-select')
    .click('.input-btn button:last-of-type')
    .evaluate(() => document.title)
    .end()
    .then(title => {
      console.log(`${title} 加载完成`)
    })
})
module.exports = router;