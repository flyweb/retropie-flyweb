var express = require('express');
var fs = require('fs');
var router = express.Router();

// TODO needs to be changed to whatever directory the games are in
var path = "C:\Users\karui\Desktop";


/* GET / */
router.get('/files', function(req, res, next) {
  res.render('files', {
    title: 'File Manager'
  });
});

module.exports = router;