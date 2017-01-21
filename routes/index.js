var express = require('express');
var fs = require('fs');
var hbs = require('hbs');
var router = express.Router();
var spawn = require('child_process').spawn;

// TODO to be changed to list of games directory
var path = "C:\\Users\\karui\\Desktop";

/* GET / */
router.get('/', function(req, res, next) {
  var svg = fs.readFileSync('public/svg/snes.svg');
  res.render('index', {
    layout: 'layouts/default',
    svg: new hbs.handlebars.SafeString(svg)
  });
});

router.get('/files', function (req, res, next) {
  var files = listFiles(path);

  res.render('files', {
    layout: 'layouts/admin',
    title: 'List of Games',
    files: files
  });
});

router.post('/upload', function (req, res, next) {
  var args = [];
  var file = req.files[0];
  var filePath = args.concat(file.path);
  var originalName = file.originalname;
  var encoding = file.encoding;
  var newFileName = path + "\\" + originalName;

  var tempFile = fs.readFileSync(filePath[0]);
  fs.writeFile(newFileName, tempFile, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Sucessfully uploaded to " + newFileName);
  });

  // show the list of files again, including the file that was just uploaded
  // shows the file that was just uploaded first (at the top of the list)
  var files = listFiles(path);
  files.unshift(originalName);
  res.render('files', {
    layout: 'layouts/admin',
    title: 'List of Games',
    files: files
  });
});

router.post('/delete/:name', function (req, res, next) {
  var name = req.params.name;
  console.log("received delete for " + name);

  var filePath = path + "\\" + name;
  fs.unlink(filePath, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log(name + " deleted successfully");
  });

  var files = listFiles(path);
  var index = files.indexOf(name);

  if (index > -1) {
    files.splice(index, 1);
  }
  
  res.render('files', {
    layout: 'layouts/admin',
    title: 'List of Games',
    files: files
  });
});

function listFiles(path) {
  return fs.readdirSync(path);
}

module.exports = router;
