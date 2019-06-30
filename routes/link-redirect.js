var express = require('express');
var math = require('Math')
var router = express.Router();
var path = require('path');

/* GET users listing. */
router.get('/:jwt', function(req, res, next) {
    console.log(req.params.jwt);
});

module.exports = router;