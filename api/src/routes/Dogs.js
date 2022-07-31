const { Router } = require('express');
const { getAllDogsByName } = require('../Controllers/DogsController.js');


const router = Router();

router.get ( '/dogs', getAllDogsByName)
router.get ( '/get', )

router.post ( '/create', )

module.exports = router;