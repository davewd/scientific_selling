var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// import the actual aapi endpoints
var pixelRouter = require('./routes/pixel');
var pixelDelayRouter = require('./routes/pixel-delay');
var linkRedirectRouter = require('./routes/link-redirect');

// Start the engine
const app = express()
var environment = process.env.NODE_ENV
const port = 3000

app.use(logger(environment));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Configure the endpoints
app.use('/p', pixelRouter);
app.get('/', (req, res) => res.send('Hello World!'))

const config = require('config-yml').load(environment)

console.log(config.app.url);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;