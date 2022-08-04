const { Router } = require('express');
const { getAllTemperaments } = require('../Controllers/TemperamentController.js');


const router = Router();

router.get('/', getAllTemperaments);


module.exports = router;