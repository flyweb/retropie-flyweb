var express = require('express');
var fs = require('fs');
var hbs = require('hbs');
var router = express.Router();
var spawn = require('child_process').spawn;

// TODO to be changed to list of games directory
// '/home/pi/RetroPie/roms'
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
  files = listFiles(path);
  returnFiles(files, res);
});

router.post('/files/upload', function (req, res, next) {
  var file = req.files[0];
  var filePath = file.path;
  var originalName = file.originalname;
  var encoding = file.encoding;
  var newFileName = path + "\\" + originalName;

  var tempFile = fs.readFileSync(filePath);
  fs.writeFile(newFileName, tempFile, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Sucessfully uploaded to " + newFileName);
  });

  var files = listFiles(path);
  files.unshift(originalName);
  returnFiles(files, res);
});

router.post('/files/delete/:name', function (req, res, next) {
  var name = req.params.name;
  console.log("received delete for " + name);

  var filePath = path + "\\" + name;
  fs.unlink(filePath, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log(name + " deleted successfully");
  });
  
  files = removeDeletedFileFromList(files, name);
  returnFiles(files, res);
});

function listFiles(path) {
  return fs.readdirSync(path);
}

function removeDeletedFileFromList(files, name) {
  var files = listFiles(path);
  var index = files.indexOf(name);
  if (index > -1) {
    files.splice(index, 1);
  }
  return files;
}

function returnFiles(files, res) {
  res.render('files', {
    layout: 'layouts/admin',
    title: 'List of Games',
    files: files
  });
}

module.exports = router;
