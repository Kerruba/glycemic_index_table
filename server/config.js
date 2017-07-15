const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

let app = express();
// mongo.connect();

// Setup express to serve static content from client folder
app.use( express.static(__dirname + '/../client') );

// Setup CORS for localhost:3001
app.use( (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Body content parsers
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(expressValidator());

// Add validation

module.exports = app;