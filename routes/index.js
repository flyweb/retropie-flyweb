var express = require('express');
var fs = require('fs');
var hbs = require('hbs');
var router = express.Router();

// TODO to be changed to list of games directory
var path = "C:\\Users\\karui\\Desktop";

/* GET / */

/* GET / */
router.get('/', function(req, res, next) {
  var svg = fs.readFileSync('public/svg/snes.svg');
  res.render('index', {
    svg: new hbs.handlebars.SafeString(svg)
  });
});

router.get('/files', function(req, res, next) {
  function listFiles(path) {
    return fs.readdirSync(path);
  }

  var files = listFiles(path);

  res.render('files', {
    title: 'List of Games',
    files: files
  });
});

module.exports = router;
