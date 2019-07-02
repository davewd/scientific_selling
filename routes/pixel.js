var express = require('express');
var math = require('Math');
var path = require('path');

var router = express.Router();
/* GET users listing. */

function write() { // Async function statment
    new Promise((resolve, reject) => setTimeout(resolve, 3000)).then(function(){
    console.log("ASynch Complete")});
  }

router.get('/:name/:delay?', async function(req, res, next) {
    console.log(req.params.name);
    console.log(req.params.delay);
    console.log(JSON.stringify(req.headers));
    write();
    if (typeof req.params.delay !== 'undefined' || req.params.delay !== null)
    new Promise((resolve, reject) => setTimeout(resolve, 
        Math.min( req.params.delay * 1000, 30000))).then(function(){
            res.sendFile(path.resolve(__dirname, '../public/images/p.gif'));
    }).then(function(){console.log("Add Header info to Queue")});

    
});

module.exports = router;