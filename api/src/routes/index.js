const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const ROuterAllDogs = require('./Dogs.js');
//const RouterDogsName = require('./Dogs.js');
//const RouterDogsID = require('./Dogs.js');
//const RouterDogsCreate = require('./Dogs.js');
const RouterTemperaments = require('./Temperaments.js');



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', ROuterAllDogs);
// router.use('/name', RouterDogsName);
// router.use('/:id', RouterDogsID);
// router.use('/create', RouterDogsCreate);
router.use('/temperaments', RouterTemperaments);



module.exports = router;
