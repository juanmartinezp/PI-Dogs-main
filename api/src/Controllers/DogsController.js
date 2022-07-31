const axios = require('axios');
const { Dog, Temperament } = require ('../db.js');
const { API_KEY } = process.env

//----------------------- GET All API Dogs-----------------------------------------------------
const getAllApiDogs = async () => {
    try {
        const pedidoApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        const dataApi = pedidoApi.data.map((e) => {
            return {
                id: e.id,
                name: e.name,
                height: e.height.metric,
                weight: e.weight.metric,
                life_span: e.life_span,
                temperament: e.temperament,
                image: e.image.url,
            }
        });

        return dataApi;
        }
    catch (error) {
        console.log('Error en el pedido de la API', error);
    }
}



const getAllDBDogs = async () => {
    try {
        let dogRaces = await Dog.findAll({
            include: {
                model: Temperament,
                attributes: ['name'], //Me traigo el nombre de los temperamentos
                through: {
                    attributes: [], //Tomo solo lo que queda en el arreglo attributes
                }
            }
        })
        return dogRaces;
        }
    catch (error) {
        console.log('Error en el pedido de la base de datos', error);
    }
}



const getAllDogs = async () => {
    try {
        const dataApi = await getAllApiDogs();
        const dataDB = await getAllDBDogs();
        const allDogs = [...dataApi, ...dataDB];
        return allDogs;
    }

    catch (error) {
        console.log('Error en el pedido de la base de datos o en la API', error);
    }
}



const getAllDogsByName = async (req, res) => {
    try {
        const { name } = req.query;
        const allDogs = await getAllDogs();
        
        if(name) {
            let dogsName = allDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
            if(dogsName.length > 0) {
                res.status(200).json(dogsName);
            }
            else {
                res.status(404).send('No hay perros de la raza ' + name);
            }
        }
    }
    catch (error) {
        console.log('AllDogsByName Error', error);
    }
}



const getAllDogsByID = async (req, res) => {
    try {
        const { id } = req.params;
        const allDogs = await getAllDogs();
        let dogsID = allDogs.filter(dog => dog.id === id);
        if(dogsID.length > 0) {
            //aca hay que agregar el temperamento y traer el resto de la info de dogs
            res.status(200).json(dogsID);
        }
        else {
            res.status(404).send('No hay perros con el ID ' + id);
        }
    }
    catch (error) {
        console.log('AllDogsByID Error', error);
    }
}






module.exports= {
    getAllDogsByName, 
    getAllDogsByID, 
    getAllDogs
}