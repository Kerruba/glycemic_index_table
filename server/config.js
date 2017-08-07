const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const Qty = require('js-quantities');
const dbUtils = require('./utilities/dbUtils.js');
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//Set up default mongoose connection

let argv = require('minimist')(process.argv.slice(2), {
    default: {
        'mongo': false,
        'mongo_address': '127.0.0.1',
        'mongo_database': 'glycemic',
        'food_db_path': 'food_database.json',
        'meal_db_path': 'meal_database.json'
    }
});
global.food_database = dbUtils.loadFoodDatabase(argv.food_db_path);
global.meal_database = dbUtils.loadDatabase(argv.meal_db_path);
global.food_db_path = argv.food_db_path;
global.meal_db_path = argv.meal_db_path;

console.dir(argv);

let app = express();
let mongoDB = `mongodb://${argv.mongo_address}/${argv.mongo_database}`;
mongoose.connect(mongoDB);

//Get the default connection
let db = mongoose.connection;
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
app.use(expressValidator({
    customValidators: {
        isQty(value) {
            try {
                let qty = new Qty(value);
                return !qty.isUnitless();
            } catch (e) {
                return false;
            }
        }
    }
}));

// Add validation

module.exports.app = app;
module.exports.database = mongoose;