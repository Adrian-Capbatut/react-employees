var express = require('express');
var router = express.Router();

// api/user/Login
router.post('/login', function (req, res) {
  res.send('login');
});

// api/user/register
router.post('/register', function (req, res) {
  res.send('register');
});

// api/user/current
router.get('/current', function (req, res) {
  res.send('current');
});

module.exports = router;
