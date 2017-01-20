var express = require('express');
var fs = require('fs');
var router = express.Router();

// TODO to be changed to list of games directory
var path = "C:\\Users\\karui\\Desktop";

/* GET / */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'FlyWeb All-In-One Printer'
  });
});

router.get('/files', function(req, res, next) {
  res.render('files', {
    title: 'List of Games',
    files: files
  });
});

function listFiles(path) {
  return fs.readdirSync(path);
}

var files = listFiles(path);

module.exports = router;
