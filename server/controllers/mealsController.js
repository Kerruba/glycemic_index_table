// let dbUtils = require('../utilities/dbUtils.js');
let Meal = require('../model/schema').Meal;

module.exports.postMeal = function(req,res) {
    let meal = {
        date: new Date(),
        content: req.body
    };
    // meal_database.push(meal);
    // dbUtils.saveDatabase(meal_database, global.meal_db_path);
    
    res.status(201).send('Element stored to the database');
    return;
};