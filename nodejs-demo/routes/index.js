var express = require('express');
var router = express.Router();
var c = require('../controllers/testController')
var b = require('../controllers/bookConyroller')

/* GET home page. */
/* router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
}); */

router.get('/', c.resTest);

router.get('/book', b.resBook);

router.get('/putBook', b.insertBook);

router.get('/deleteBook', b.deleteBook);

module.exports = router;
