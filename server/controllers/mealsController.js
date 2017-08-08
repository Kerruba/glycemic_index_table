// let dbUtils = require('../utilities/dbUtils.js');
let Meal = require('../models/schemas').Meal;

module.exports.getMeals = function(req,res) {
    Meal.find({})
        .then(docs => res.json(docs))
        .catch(err => res.status(500).send('Internal server error', err));
};

module.exports.postMeal = function(req,res) {
    // meal_database.push(meal);
    // dbUtils.saveDatabase(meal_database, global.meal_db_path);
    console.log('Hit post meal');
    console.log(req.body);
    let meal = new Meal({
        date: new Date(),
        content: req.body.content,
        description: '',
        total_load: req.body.total_load
    });
    meal.save(err => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            console.log('Element stored in the database');
            res.status(201).send('Element stored to the database');
        }
    });
};