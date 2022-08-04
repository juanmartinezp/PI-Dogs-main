const axios = require('axios');
const { Temperament } = require('../db');
//const { API_KEY } = process.env
const { getAllApiDogs } = require('./DogsController')




//----------------------- GET All Temperaments-----------------------------------------------------
// const getAllTemperaments = async (req, res) => {
//     try {
//         const allApiDogs = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
//         const temperamentsList = allApiDogs.data.map(e => e.temperament);

//         let aux = '';
//         for(let i=o; i<temperamentsList.length; i++) {
//             aux = aux + temperamentsList[i] + ', ';
//         }
//         const temperamentsSplit = aux.split(', ');
//         const allTemperaments = [...new Set(temperamentsSplit)];

//         allTemperaments.map((e) => {
//             Temperament.findOrCreate({
//                 where: { name: e },
//             })
//         })
//         const finalTemperaments = await Temperament.findAll({ attributes: ['name'] });
//         res.status(200).json(finalTemperaments);
//     }
//     catch ( error ) {
//         res.status(404).send('Error en el pedido de la API o  en la base de datos');
//     }
// }

const getAllTemperaments = async (req, res) => {

    try {

        const apiTemperaments = await getAllApiDogs();

        let temperamentapi = apiTemperaments.map(
            (element) => element.temperament?.split(",")).flat() // element.temperament)


        // let allTemperaments = [...new Set(temperamentapi)]

        temperamentapi.forEach( async (temp) => {
            if(!temp) return 
            const [ createdTemp, isCreated ] = await Temperament.findOrCreate({
                where: {
                    name: temp
                },
                defaults: {
                    name: temp
                }
            })
            console.log(isCreated)
        })

        console.log(temperamentapi)

        const temperamentsDb = await Temperament.findAll()

        return res.status(200).json(temperamentsDb)

    } catch(error) {
        console.log("getAllTemperaments Error", error)
    }
}



module.exports = {
    getAllTemperaments
}

