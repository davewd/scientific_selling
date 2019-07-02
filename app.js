var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var compression = require('compression');



// import the actual aapi endpoints
var pixelRouter = require('./routes/pixel');
var linkRedirectRouter = require('./routes/link-redirect');

// Start the engine
const app = express()
var environment = app.get('env')
var config = require('config-yml').load(environment)
console.log('Environment: '+ environment);

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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;