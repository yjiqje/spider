/**
 * tesseract 开源OCR
 */
let express = require('express');
let router = express.Router();
let path = require('path')
//let fs = require('fs')
//使用 gm 必须服务端安装graphicsmagick and imagemagick
const gm = require('gm');
const tesseract = require("node-tesseract-ocr")

router.get('/', (req, res, next) => {
  //let img = path.resolve(__dirname, '../img/11.png')
  //let file = fs.readFileSync(path.resolve(__dirname, '../img/671.png'))

  gm(path.resolve(__dirname, '../img/11.png'))
    .noProfile()
    //.blur(7, 3)
    //.stream()
    //.noise('laplacian')
    .edge(3)
    //.resize(500, 200)
    .write(path.resolve(__dirname, '../img/reset.png'), (err) => {
      if (err) {
        console.log(JSON.stringify(err));
      } else {
        let img = path.resolve(__dirname, '../img/zh.png')
        const config = {
          lang: "chi_sim"
        }
        tesseract.recognize(img, config)
          .then(text => {
            res.json({
              status: 0,
              text: text
            })
            console.log("Result:", text)
          })
          .catch(error => {
            console.log(error.message)
          })
      }
    });


})

module.exports = router;
