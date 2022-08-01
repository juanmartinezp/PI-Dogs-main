const { Router } = require('express');
const { getAllTemperaments } = require('../Controllers/TemperamentController.js');


const router = Router();

router.get('/temperaments', getAllTemperaments);


module.exports = router;