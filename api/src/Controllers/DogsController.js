const axios = require('axios');
const { Dog, Temperament } = require ('../db.js');
const { API_KEY } = process.env

//-------------------------------------------------------------------------------------------------

const getAllApiDogs = async () => {
try {
    const apiReq = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)

        let apiInfo = apiReq.data.map(e => {


            let weightAux = e.weight.metric
            if(weightAux.includes('NaN') || weightAux.length < 3) {
                weightAux = "20 - 40"
            }
            else { weightAux = e.weight.metric }
            
            return {
            id: e.id,
            name: e.name,
            weight: weightAux,
            height: e.height.metric,
            lifeSpan: e.life_span,
            temperament: e.temperament? e.temperament : "Dog without temperament",
            image: e.image.url? e.image.url : "https://unsplash.com/es/fotos/By-tZImt0Ms"
            }
        })
                    return apiInfo;
} catch(error) {
    console.log("getAllApiDogs Error", error)
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
        console.log('getAllDBDogs Error', error);
    }
}



const getAllDogs = async (req, res) => {             
    try {
        const { name } = req.query;
        const dataApi = await getAllApiDogs();
        const dataDB = await getAllDBDogs();
        const allDogs = [...dataApi, ...dataDB];
        

    if(name) {
        let dogName = allDogs.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))

        if(dogName.length > 0) { return res.status(200).json(dogName) } 
        else { return res.status(400).json({message: "No dogs named " + name + " found"}) }
}
    return res.json(allDogs)
    } 
    
    catch(error) {
    console.log("allDogs Error", error)
    }
}



const getAllDogsByID = async (req, res) => {

    try {   
        const { id } = req.params

        if(id.includes("-")) {   
            const DbId = await Dog.findOne({
                where : { id: id },
                include: Temperament 
            })
    
            if(DbId) { return res.json(DbId) } 
            else { return res.status(404).json({message: "The dog with the ID " + id + " was not found in the Database"}) }
        }
    
        let IdApi = await getAllApiDogs();
    
        let findID = IdApi.find(e => e.id.toString() === id)

            if(findID) { return res.status(200).json(findID) } 
            else { return res.status(404).json({message: "The dog with the ID " + id + " was not found"}) }
    }
    
    catch(error) {
            console.log(error)
    }
}




const createNewDog = async (req, res) => {  //REVISAR
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
    getAllDogsByID,
    createNewDog, 
    getAllDogs
}