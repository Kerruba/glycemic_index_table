let Qty = require('js-quantities');
// let dbUtils = require('../utilities/dbUtils.js');
let Aliment = require('../models/schemas').Aliment;

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


module.exports.getAliments = function(req,res) {
    // res.json(food_database);
    Aliment.find({}).then(docs => res.json(docs)).catch(res.send(500));
};

module.exports.postAliments = function(req,res) {

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
            glycemic_index: parseInt(req.body.glycemic_index),
            carbs_percentual: parseInt(req.body.carbs),
            glycemic_load: parseInt(req.body.glycemic_load),
            serving: Qty(req.body.serving)
        };
        // food_database.push(food);
        let aliment = new Aliment(food);
        // dbUtils.saveDatabase(food_database, global.food_db_path);
        aliment.save((err) => {
            if (err) {
                res.send(500);
            } else {
                Aliment.find({}).then(docs => res.json(docs));
            }
        });
    });
};

module.exports.deleteAliments = function(req, res) {
    console.log(req.params);
    req.checkParams('foodId', 'Food id must be a number').isInt();

    req.getValidationResult()
        .then(results => {
            if (!results.isEmpty()) {
                res.status(400).json(validationConverter(results.array()));
                return;
            }
            let foodId = parseInt(req.params.foodId);
            if (foodId > food_database.length) {
                res.status(400).send('The provided ID is not present in the database');
                return;
            }
            food_database.splice(foodId,1);
            dbUtils.saveDatabase(food_database, global.food_db_path);
            res.json(food_database);
        });
};
