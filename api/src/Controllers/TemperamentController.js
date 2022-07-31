const axios = require('axios');
const { Temperament } = require('../db');
const { API_KEY } = process.env

const getAllTemperaments = async (req, res) => {

    try {
        const apiTemperaments = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);


        let temperamentApi = apiTemperaments.data.map((e) => {
            return {
                id: e.id,
                name: e.name,
            }
        })
    }
    catch (error) {
        console.log(error);
    }
}