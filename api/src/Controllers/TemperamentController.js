const axios = require('axios');
const { Temperament } = require('../db');
const { API_KEY } = process.env




//----------------------- GET All Temperaments-----------------------------------------------------
const getAllTemperaments = async (req, res) => {
    try {
        const allApiDogs = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        const temperamentsList = allApiDogs.data.map(e => e.temperament);

        let aux = '';
        for(let i=o; i<temperamentsList.length; i++) {
            aux = aux + temperamentsList[i] + ', ';
        }
        const temperamentsSplit = aux.split(', ');
        const allTemperaments = [...new Set(temperamentsSplit)];

        allTemperaments.map((e) => {
            Temperament.findOrCreate({
                where: { name: e },
            })
        })
        const finalTemperaments = await Temperament.findAll({ attributes: ['name'] });
        res.status(200).json(finalTemperaments);
    }
    catch ( error ) {
        res.status(404).send('Error en el pedido de la API o  en la base de datos');
    }
}



module.exports = {
    getAllTemperaments
}

