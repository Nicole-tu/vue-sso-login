var express = require('express');
var users = require('./users');

var router = express.Router();

router.use('/users', users);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
