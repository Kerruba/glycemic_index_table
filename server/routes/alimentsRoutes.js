let express = require('express');
let router = express.Router();
let alimentsController = require('../controllers/alimentsController.js');

router.get('/', alimentsController.getAliments);
router.post('/', alimentsController.postAliments);
router.delete('/:foodId', alimentsController.deleteAliments);

module.exports = router;