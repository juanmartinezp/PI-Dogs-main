const axios = require('axios');
const { Dog, Temperament } = require ('../db.js');
const { API_KEY } = process.env

//-------------------------------------------------------------------------------------------------
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



// const getAllDogs = async (req, res) => {
//     try {
//         const dataApi = await getAllApiDogs();
//         const dataDB = await getAllDBDogs();
//         const allDogs = [...dataApi, ...dataDB];
//         return res.json(allDogs);
//     }

//     catch (error) {
//         console.log('Error en el pedido de la base de datos o en la API', error);
//     }
// }



// const getAllDogsByName = async (req, res) => {
//     try {
//         const { name } = req.query;
//         const allDogs = await getAllDogs();
        
//         if(name) {
//             let dogsName = allDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
//             if(dogsName.length > 0) {
//                 res.status(200).json(dogsName);
//             }
//             else {
//                 res.status(404).send('No hay perros de la raza ' + name);
//             }
//         }
//     }
//     catch (error) {
//         console.log('AllDogsByName Error', error);
//     }
// }


const getAllDogs = async (req, res) => {
    try {
        const { name } = req.query;
        const dataApi = await getAllApiDogs();
        const dataDB = await getAllDBDogs();
        const allDogs = [...dataApi, ...dataDB];
        

if(name) {
    let dogsName = allDogs.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
    console.log(allDogs)
if(dogsName.length > 0) {
    return res.status(200).json(dogsName)
} else {
    return res.status(400).json({message: "No dogs found whit this " + name})
}
}
return res.json(allDogs)

} catch(error) {
console.log("allDogs Error", error)
}
}



// const getAllDogsByID = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const allDogs = await getAllDogs();
//         let dogsID = allDogs.filter(dog => dog.id === id);
//         if(dogsID.length > 0) {
//             //aca hay que agregar el temperamento y traer el resto de la info de dogs
//             res.status(200).json(dogsID);
//         }
//         else {
//             res.status(404).send('No hay perros con el ID ' + id);
//            // res.json(allDogs);
//         }
//     }
//     catch (error) {
//         console.log('AllDogsByID Error', error);
//     }
// }

const getAllDogsByID = async (req, res) => {

    try {
    
        const { id } = req.params
    
        if(id.includes("-")) {
    
            const idDb = await Dog.findOne({
                where : {
                    id: id
                },
                include: Temperament 
            })
    
    //        console.log(idDb)
    
            if(idDb) {
                return res.json(idDb)
            } else {
                return res.status(404).json({message: "Id dog not found"})
            }
        }
    
        let idInfo = await getAllApiDogs();
    
        let infoFilter = idInfo.filter((e) => e.id == id)
            if(infoFilter.length > 0) {
                return res.status(200).json(infoFilter)
            } else {
                return res.status(404).json({message: "Dog not found"})
            }
        } catch(error) {
            console.log(error)
        }
    }



// const createNewDog = async (req, res) => {
//     try {
//         const { name, height, weight, life_span, temperament } = req.body;
        
//         if(!name || !height || !weight || !life_span || !temperament) return res.status(404).json({message: "Missing parameters"})
//         const newDog = await Dog.create({
//             name,
//             height,
//             weight,
//             life_span,
//             temperament,
//         });
//         let temperamentDB = await Temperament.findAll({
//             where: { name: temperament },
//         })
//         console.log('perro creado')
//         await newDog.addTemperament(temperamentDB)
//         res.status(201).json(newDog);
//     }
//     catch (error) {
//         console.log('Error al crear un nuevo perro', error);
//         res.status(400).json({message: "Error al crear un nuevo perro", error: error});
//     }
// }

const createNewDog = async (req, res) => {
    try {
        const { name, weight, height, life_span, temperament, image, createdInDb } = req.body;
        if(!name || !weight || !height || !life_span || !temperament) return res.status(404).json({message: "Missing data"}) 
        const newDog = await Dog.create({
            name,
            weight,
            height,
            life_span,
        })
        
        console.log('create new dog', createNewDog)
        let temperamentDb = await Temperament.findAll({
            where: {
                name: temperament
            }
        })

        await newDog.addTemperament(temperamentDb)
        return res.status(200).send(newDog)

    } catch(error) {
        console.log("Created dog Error", error)
        res.status(400).json({message: "Error creating a new dog", error: error})
    }
}






module.exports= {
    getAllApiDogs,
    getAllDBDogs,
    getAllDogsByID,
    createNewDog, 
    getAllDogs
}