let express = require('express');
let router = express.Router();
let mealsController = require('../controllers/mealsController.js');

router.post('/', mealsController.postMeal);
router.get('/', mealsController.getMeals);
router.put('/:mealId', mealsController.putMeal);
router.delete('/:mealId', mealsController.deleteMeal);

module.exports = router;