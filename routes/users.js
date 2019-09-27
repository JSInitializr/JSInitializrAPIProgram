var express = require('express');
var router = express.Router();
var zip = require('express-easy-zip');
var fs = require('fs');
var path = require('path');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('here it is')
  var projectListPath = __dirname + './../public/';
  fs.readdir(projectListPath, (error, list) => {
    if(error) {
      console.log(error);
      res.send(error);
      return;
    } 
    res.zip({
      files: [{
        content: 'this is a string',      //options can refer to [http://archiverjs.com/zip-stream/ZipStream.html#entry](http://archiverjs.com/zip-stream/ZipStream.html#entry)
        name: 'file-name',
        mode: 0755,
        comment: 'comment-for-the-file',
        date: new Date(),
        type: 'file'},
        { path: path.join(projectListPath, 'nodeJavascript'), name: 'nodeJavascript'}
      ],
      filename: 'abc.zip'
    })
  })
  // res.send('respond with a resource');
});

module.exports = router;
