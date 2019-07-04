var express = require('express');
var math = require('Math');
var path = require('path');

//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var PixelModelSchema = new Schema({
    pixelID: String,
    timestamp: Date,
    params: {},
    request_header: {},
    complete: Boolean
});

// Compile model from schema
var PixelModel = mongoose.model('PixelModel', PixelModelSchema);

var router = express.Router();
/* GET users listing. */

function write(name, request_header, params, complete) { 
    // Async function statment
    // prefer to queue and then write async via a batch ... but no time.
    model_dict = {
        pixelID: name,
        timestamp: Date.now(),
        params: params,
        request_header: request_header,
        complete: complete
    }
    console.log(model_dict);
    new Promise((resolve, reject) => PixelModel.create(model_dict, function (err, model_instance) {
        if (err) 
            console.log("An Error has occurred : " + err );
        else
            console.log("ASynch Write Complete");
    }));
}

router.get('/:name/:delay?', async function (req, res, next) {
    console.log(req.params.name);
    console.log(req.params.delay);

    write(req.params.name, req.header, req.params, false);
    if (typeof req.params.delay !== 'undefined' || req.params.delay !== null)
        new Promise((resolve, reject) => setTimeout(resolve,
            Math.min(req.params.delay * 1000, 30000))).then(function () {
            res.sendFile(path.resolve(__dirname, '../public/images/p.gif'));
        }).then(function () {
            console.log("Add Header info to Queue")
        }).catch(next);
    write(req.params.name, req.header, req.params, true); // love to optimize the update

});

module.exports = router;