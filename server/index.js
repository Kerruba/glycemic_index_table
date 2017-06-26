'use strict';
const express = require('express');
const path = require('path');
const engines = require('consolidate');
const bodyParser = require('body-parser');
const dbUtils = require('./dbUtils.js');
// const mongo = require('./mongoUtils.js');


let [,,db_path = 'database.json'] = process.argv;
const database = dbUtils.loadDatabase(db_path);


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


app.get('/aliments', (req,res) => {
    res.json(database);
    /*
    // res.json(req.query)
    // res.json(req.query); 
    // let pag ={
    //     size: req.query.size = 10,
    //     page: req.query.page = 0    
    // };
    // res.json(pag);
    // let pagination = {
    //     size: req.query.size ? parseInt(req.query.size) : 10,
    //     page: req.query.page ? parseInt(req.query.page) : 0
    // };

    // mongo.aliments().find()
    //     .skip(pagination.page*pagination.size)
    //     .limit(pagination.size)
    //     .toArray((err, result) => {
    //         if (err) {
    //             throw err;
    //         }
    //         res.json(result);
    //     });
    */
});

app.post('/aliments', (req, res) => {
    let food = {
        name: req.body.food_name,
        details: req.body.food_details,
        gi: parseInt(req.body.food_gi),
        carbs_perc: parseInt(req.body.food_carbs),
        gl: parseInt(req.body.food_gl),
        serving: `${req.body.food_serving} g`
    };
    database.push(food);
    dbUtils.saveDatabase(database, db_path);
    res.redirect('/index.html');
});

app.listen(3000, function() {
    'use strict';
    console.log(database);
    console.log('Example app listening on port 3000!');
});
