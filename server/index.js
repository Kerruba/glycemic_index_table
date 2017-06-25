'use strict';
const express = require('express');
const path = require('path');
const engines = require('consolidate');
// const mongo = require('./mongoUtils.js');


let [,,db_path = 'database.json'] = process.argv;
const database = require('./dbUtils.js').loadDatabase(db_path);


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

app.get('/aliments', (req,res) => {
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
    res.json(database);
});

app.listen(3000, function() {
    'use strict';
    console.log(database);
    console.log('Example app listening on port 3000!');
});
