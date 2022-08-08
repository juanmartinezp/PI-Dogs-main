const axios = require ("axios");
// export const GET_ALL_DOGS = "GET_ALL_DOGS";
// export const GET_DOGS_BY_NAME = "GET_DOGS_BY_NAME";
// export const GET_DOGS_TEMPERAMENT = "GET_DOGS_TEMPERAMENT";
// export const GET_DOG_DETAIL = "GET_DOG_DETAIL";

//---------------------------- RUTAS ------------------------------

const RUTA_GET = "http://localhost:3001/dogs/";
const RUTA_GET_TEMPERAMENT = "http://localhost:3001/temperaments/";
//const RUTA_GET_DOG_BY_NAME = "http://localhost:3001/dogs?name="
const RUTA_POST = "http://localhost:3001/dogs/create";


//------------------------ RENDER/HOME ------------------------------

export function getAllDogs() {
    return async function(dispatch) {
        try {
            const allDogs = await axios.get(RUTA_GET)
            return dispatch({
                type: "GET_ALL_DOGS",
                payload: allDogs.data
            })
        } catch(error) {
            console.log("Error getting dogs", error)
        }
    }
}

// export const getAllDogs = () => async dispatch => {
//     return await fetch(RUTA_GET)
//     .then(response => response.json())
//     .then(json => dispatch ({
//         type:  "GET_ALL_DOGS", 
//         payload: json}))
//     .catch((error) => {
//         console.log(error)
//     })  
// }

//------------------------ RENDER/SEARCH/NAME ----------------------

export function searchByName(name) {
    return async function(dispatch) {
        try {
            const dogsByName = await axios.get(
                `http://localhost:3001/dogs?name=${name}`)
            return dispatch({
                type: "GET_DOGS_BY_NAME",
                payload: dogsByName.data
            })
        } catch(error) {
        console.log("Error getting dogs by name", error)
        }   
    }
}

// export const searchByName = (name) => async dispatch => {
//     return await fetch(http://localhost:3001/dogs?name=${name})
//     .then(resp => resp.json())
//     .then(dogsByName => dispatch({
//         type: "GET_DOGS_BY_NAME",
//         payload: dogsByName
//     }))
//     .catch((error) => {
//         console.log("Error getting dogs by name", error)
//     })
// }

//------------------------ RENDER/CREATE/DOG ------------------------

export function createDog(payload) {
    return async function (dispatch) {
        try {
            const createDog = await axios.post(RUTA_POST, payload)
        return dispatch({
            type: "CREATE_DOG",
            payload: createDog.data
        })

        } catch(error) {
            console.log("Error creating a new dog", error)
        }
    }
}

// export const getDogsByName = (name) => {
//     return async function(dispatch) {
//         try {
//             const res = await axios(`
//             http://localhost:3001/dogs?name=${name}`)
//         return dispatch({
//             type: GET_DOGS_BY_NAME,
//             payload: res.data
//         })
//         } catch(error) {
//             console.log("Error getting dogs name", error)
//         }
//     }
// } 


//------------------------ RENDER/ALL/TEMPERAMENTS -----------------

export function getAllTemperament() {
    return async function(dispatch) {
        try {
            const allTemperaments = await axios.get(
                RUTA_GET_TEMPERAMENT)
            return dispatch({
                type: "GET_DOGS_TEMPERAMENT",
                payload: allTemperaments.data
            })
        }catch(error) {
            console.log("Error getting all the temperaments", error)
        }
    }
}

// export const getAllTemperaments = () => async dispatch => {
//     return await fetch(RUTA_GET_TEMPERAMENT)
//     .then(response => response.json())
//     .then(json => dispatch({
//         type: "RUTA_GET_TEMPERAMENT", 
//         payload: json}))
//     .catch((error) => {
//         console.log(error)
//     })  
// } 

//------------------------ RENDER/DETAIL/DOG -------------------------

export function getDogDetail(id) {
    return async function (dispatch) {
        try {
            const dogDetail = await axios.get(`
            http://localhost:3001/dogs/${id}`)
        return dispatch({
            type: "GET_DOG_DETAIL",
            payload: dogDetail.data
        })

        } catch(error) {
            console.log("Error gettig dog by ID", error)
        }
    }
}

    // export const getDogDetail = (id) => async dispatch => {
    //     return await fetch(`http://localhost:3001/dogs/${id}`)
    //     .then(response => response.json())
    //     .then(dog => dispatch({ 
    //         type: "GET_DOG_DETAIL",
    //         payload: dog
    //     }))
    //     .catch((error) => {
    //         console.log(error)
    //     })
    // }

    //---------------------- RENDER/DOG/API OR DB FILTER -------------------------

    export function filterDogsByOrigin(payload) {
        return {
            type: "FILTER_DOGS_BY_ORIGIN",
            payload,
        }
    }

    //----------------- RENDER/TEMPERAMENT/FILTER -----------------

    export function getTemperamentFilter(payload) {

        return {
            type: "GET_TEMPERAMENT_FILTERED",
            payload,
        }
    }

//----------------------- RENDER/RACE/FILTER -----------------------

    export function getRaceFilter(payload) {
        return {
            type: "GET_RACE_FILTERED",
            payload,
        }
    }

//--------------------- RENDER/ALPAHBET/ORDER ----------------------

    export function orderByAlphabet(payload) {
        return {
            type: "GET_ORDERED_ALPHABET",
            payload,
        }
    }

//--------------------- RENDER/WEIGHT/ORDER ------------------------

    export function sortByWeight(payload) {
        return {
            type: "GET_WEIGHT_ORDERED",
            payload,
        }
    }

//---------------------- RENDER/DOG/DELETE -------------------------

export function deleteDog(id) {
    return async function (dispatch) {
        try {
            const deleteDog = await axios.delete(
            `http://localhost:3001/dogs/${id}`)
            return dispatch({
                type: "DELETE_DOG",
                payload: deleteDog.data
            })
        } catch(error) {
            console.log("Error deleting the dog", error)
        }
    }
}