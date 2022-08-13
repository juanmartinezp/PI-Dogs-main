const { Router } = require('express');
//const { getAllDogsByName } = require('../Controllers/DogsController.js');
const { getAllDogsByID } = require('../Controllers/DogsController.js');
const { getAllDogs } = require('../Controllers/DogsController.js');
const { createNewDog } = require('../Controllers/DogsController.js');



const router = Router();

router.get('/', getAllDogs);
//router.get ( '/name', getAllDogsByName)
router.get ( '/:id', getAllDogsByID)
router.post('/create', createNewDog);

//router.post ( '/create', )

module.exports = router;