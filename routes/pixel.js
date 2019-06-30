var express = require('express');
var math = require('MAth')
var router = express.Router();
var path = require('path');

/* GET users listing. */
router.get('/:name/:delay', function(req, res, next) {
    console.log(req.params.name);
    console.log(req.params.delay);
    
    if (req.params['delay'])
        var start = Date.now()
        while (Date.now() < start + Math.min( req.params.delay * 1000, 30000)) {}

    res.sendFile(path.resolve(__dirname, '../public/images/p.gif'));
});

module.exports = router;