var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

router.get('/:jwt', function(req, res, next) {
    console.log(req.params.jwt);
});

module.exports = router;