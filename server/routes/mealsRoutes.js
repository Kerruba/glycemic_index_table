let express = require('express');
let router = express.Router();
let mealsController = require('../controllers/mealsController.js');

router.post('/', mealsController.postMeal);

module.exports = router;