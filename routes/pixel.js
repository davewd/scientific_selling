var express = require('express');
var math = require('Math')
var router = express.Router();
var path = require('path');

/* GET users listing. */

async function write() { // Async function statment
    var start = Date.now();
    while (Date.now() < start + 10000) {}
    console.log("ASynch Complete")
  }

router.get('/:name/:delay?', function(req, res, next) {
    console.log(req.params.name);
    console.log(req.params.delay);
    console.log(JSON.stringify(req.headers));
    write();
    if (typeof req.params.delay === 'undefined' || req.params.delay === null)
        var start = Date.now()
        while (Date.now() < start + Math.min( req.params.delay * 1000, 30000)) {}

    res.sendFile(path.resolve(__dirname, '../public/images/p.gif'));
});

module.exports = router;