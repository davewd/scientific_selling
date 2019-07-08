var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const app = express()

router.get('/:jwt', function(req, res, next) {
    var token = req.params.jwt;
    var secret = req.app.get('jwttoken');
    console.log(token);
    console.log(secret)
    jwt.verify(token, secret, function(err, decoded) {
        console.log(err) //
        target_url = decoded.url;
        console.log(target_url);
        req.redirect(target_url);
        console.log(decoded);

        // write
      });
});

module.exports = router;