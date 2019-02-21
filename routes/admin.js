var express = require('express');

var router = express.Router();

var user = require('./admin/user.js');
var blogs = require('./admin/blogs.js');

router.use('/user',user);
router.use('/blogs',blogs);

module.exports = router;