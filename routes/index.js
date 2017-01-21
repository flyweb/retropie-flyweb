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
    svg: new hbs.handlebars.SafeString(svg)
  });
});

router.get('/files', function (req, res, next) {
  var files = listFiles(path);

  res.render('files', {
    title: 'List of Games',
    files: files
  });
});

router.post('/files', function (req, res, next) {
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
  console.log(files);
  res.render('files', {
    title: 'List of Games',
    files: files
  });
});

function listFiles(path) {
  return fs.readdirSync(path);
}

module.exports = router;
