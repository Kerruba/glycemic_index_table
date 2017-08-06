'use strict';
// let chokidar = require('chokidar');
// let watcher = chokidar.watch('./');
// const express = require('express');
const path = require('path');
const engines = require('consolidate');
// const bodyParser = require('body-parser');
const dbUtils = require('./dbUtils.js');
const app = require('./config.js');
const Qty = require('js-quantities');

// const mongo = require('./mongoUtils.js');

// watcher.on('ready', function () {
//     watcher.on('all', function () {
//         console.log('Clearing /app/ module cache from server');
//         Object.keys(require.cache).forEach(function (id) {
//             if (/[/\\]server[/\\]/.test(id)) delete require.cache[id];
//         });
//     });
// });


let [,,db_path = 'database.json'] = process.argv;
const database = dbUtils.loadDatabase(db_path);

function validationConverter(validationResults) {
    let converted = {};
    for(let val of validationResults) {
        if(!converted[val.param]) {
            converted[val.param] = [];
        }
        converted[val.param].push(val.msg);
    }
    console.log(converted);
    return converted;
}

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
    //Validation
    req.checkBody('name','A name is required').notEmpty();
    req.checkBody('glycemic_index','Glycemic index must be a number').isInt();
    req.checkBody('glycemic_load','Glycemic load must be a number').isInt();
    req.checkBody('carbs','Carbs percentage must be a number').isInt();
    req.checkBody('serving','The serving size is required').notEmpty();
    req.checkBody('serving','Serving need to be a compatible quantity').isQty();


    req.getValidationResult().then(errors => {
        if (!errors.isEmpty()) {
            res.status(400).json(validationConverter(errors.array()));
            return;
        }
        let food = {
            name: req.body.name,
            details: req.body.details,
            gi: parseInt(req.body.glycemic_index),
            carbs_perc: parseInt(req.body.carbs),
            gl: parseInt(req.body.glycemic_load),
            serving: Qty(req.body.serving)
        };
        database.push(food);
        dbUtils.saveDatabase(database, db_path);
        res.json(database);
        // res.redirect('/index.html');
    });
});

app.delete('/aliments/:foodId', (req, res) => {
    console.log(req.params);
    req.checkParams('foodId', 'Food id must be a number').isInt();

    req.getValidationResult()
        .then(results => {
            if (!results.isEmpty()) {
                res.status(400).json(validationConverter(results.array()));
                return;
            }
            let foodId = parseInt(req.params.foodId);
            if (foodId > database.length) {
                res.status(400).send('The provided ID is not present in the database');
                return;
            }
            database.splice(foodId,1);
            dbUtils.saveDatabase(database, db_path);
            res.json(database);
        });
});

app.listen(3000, function() {
    'use strict';
    console.log(database);
    console.log('Example app listening on port 3000!');
});
