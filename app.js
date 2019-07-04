var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var compression = require('compression');
var mongoose = require('mongoose');

// Start the engine
const app = express()
var environment = app.get('env')
var config = require('config-yml');
console.log('Environment: '+ environment);
console.log('Mongo Environment: '+ config.mongo.url);


//Set up default mongoose connection
//Get the default connection
//Bind connection to error event (to get notification of connection errors)
var mongoDB = config.mongo.url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// import the actual api endpoints
var pixelRouter = require('./routes/pixel');
var linkRedirectRouter = require('./routes/link-redirect');





const port = 3000

app.use(compression());
app.use(logger(environment));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Configure the endpoints
app.get('/', (req, res) => res.send('Hello World!'))
app.use('/p', pixelRouter);
app.use('/t', linkRedirectRouter);

app.use(function (err, req, res, next) {
    // handle error
    console.log(err);
  })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;