// let dbUtils = require('../utilities/dbUtils.js');
let Meal = require('../models/schemas').Meal;

function getAllMeals() {
    return Meal.find({}).populate('content').exec();
}

module.exports.getMeals = function(req,res) {
    console.log('Hit GET meal');
    getAllMeals()
        .then(docs => res.json(docs))
        .catch(err => res.status(500).send('Internal server error', err));
};

module.exports.postMeal = function(req,res) {
    // meal_database.push(meal);
    // dbUtils.saveDatabase(meal_database, global.meal_db_path);
    console.log('Hit POST meal');
    console.log(req.body);
    let meal = new Meal({
        date: new Date(),
        content: req.body.content,
        description: '',
        total_load: req.body.total_load
    });
    meal.save()
        .then(() => res.status(201).send('Element stored to the database'))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
};

module.exports.putMeal = function(req, res) {
    console.log('Hit PUT meal');
    Meal.findByIdAndUpdate(req.params.mealId, req.body)
        .then(() => getAllMeals())
        .then(docs => res.json(docs))
        .catch(err => res.status(400).json(err));
};

module.exports.deleteMeal = function(req, res) {
    console.log('Hit DELETE meal');
    Meal.findByIdAndRemove(req.params.mealId)
        .then(() => getAllMeals())
        .then(docs => res.json(docs))
        .catch(err => res.status(400).json(err));
};


