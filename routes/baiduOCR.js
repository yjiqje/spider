/**
 * 百度OCR识别
 */
let express = require('express');
let router = express.Router();
var http = require('http');
var AipOcrClient = require("baidu-aip-sdk").ocr;

router.get('/', (req, ress, next) => {
  // 账号信息
  var APP_ID = "23587822";
  var API_KEY = "3SbOdUuuW2GvIxPg3hMELuG0";
  var SECRET_KEY = "IorFficXLWgKb2fWrHd0nzVfiVn9vOvZ";
  var client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);
  var url = "http://raymes.oss-cn-shanghai.aliyuncs.com/AppOrder/J0D1XD28/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20210125173546_20210125173607421.png";
  //var url = "http://raymes.oss-cn-shanghai.aliyuncs.com/AppOrder/J0D1XD28/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20210125174425_20210125174457032.png"
  http.get(url, (res) => {
    var chunks = [];
    let size = 0
    res.on('data', (chunk) => {
      chunks.push(chunk)
      size += chunk.length;
    })
    res.on('end', (err) => {
      var data = Buffer.concat(chunks, size);
      var base64Img = data.toString('base64');
      client.generalBasic(base64Img).then((result) => {
        ress.send(JSON.stringify(result))
      }).catch((err) => {
        ress.send(err);
      });
    })
  })
});

module.exports = router;
