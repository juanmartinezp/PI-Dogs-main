const axios = require ("axios");

//---------------------------- RUTAS ------------------------------

const RUTA_GET = "http://localhost:3001/dogs";
const RUTA_GET_TEMPERAMENT = "http://localhost:3001/temperaments";
const RUTA_POST = "http://localhost:3001/dogs/create";

//------------------------ RENDER/HOME ------------------------------

export function getAllDogs() {
    return async function(dispatch) {
        try {
            dispatch({type: "LOADING", payload: true})
            const allDogs = await axios.get(RUTA_GET)
            dispatch({type: "LOADING", payload: false})
            return dispatch({
                type: "GET_ALL_DOGS",
                payload: allDogs.data
            })
        } catch(error) {
            console.log("Error getting all dogs", error)
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

export function getDogByName(name) {
    return async function(dispatch) {
        try {
            const dogsByName = await axios.get(
                `${RUTA_GET}/?name=${name}`)
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
//     return await fetch(`http://localhost:3001/dogs?name=${name}`)
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
        console.log(payload)
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

//------------------------ RENDER/ALL/TEMPERAMENTS -----------------

export function getAllTemperament() {
    return async function(dispatch) {
        try {
            const allTemperaments = await axios.get(RUTA_GET_TEMPERAMENT)
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
            dispatch({type: "LOADING", payload: true})
            const dogDetail = await axios.get(`${RUTA_GET}/${id}`)
            dispatch({type: "LOADING", payload: false})
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

    // export function getDogDetail(id) {
    //     return (dispatch) => {
    //       fetch(`http://localhost:3001/dogs/${id}`)
    //         .then((res) => res.json())
    //         .then((dog) => {
    //           dispatch({ type: GET_DOG_DETAIL, payload: dog });
    //         })
    //         .catch((err) => {
    //           alert("Error dog ID");
    //           console.log(err);
    //         });
    //     };
    //   }

    //----------------- RENDER/TEMPERAMENT/FILTER ---------------------

    export function getTemperamentFilter(payload) {

        return {
            type: "GET_TEMPERAMENT_FILTERED",
            payload,
        }
    }

//--------------------- RENDER/ALPAHBET/ORDER --------------------------

    export function getABCOrder(payload) {
        return {
            type: "GET_ABC_ORDERED",
            payload,
        }
    }

//--------------------- RENDER/ALPAHBET/ORDER --------------------------

    export function getCBAOrder(payload) {
        return {
            type: "GET_CBA_ORDERED",
            payload,
        }
    }

// //--------------------- RENDER/WEIGHTMAX/ORDER -------------------------

//     export function getWeightMaxOrder(payload) {
//         return {
//             type: "GET_WEIGHTMAX_ORDERED",
//             payload,
//         }
//     }

//--------------------- RENDER/WEIGHTMIN/ORDER -------------------------

//     export const getWeightMinOrder = (payload) => {
//         return {
//             type: "GET_WEIGHTMIN_ORDERED",
//             payload
//         }
// }

//--------------------- RENDER/CREATION/ORDER --------------------------

    export function getOrderByCreation(payload) {
        return {
            type: "GET_ORDER_BY_CREATION",
            payload,
        }
    }

//---------------------- RENDER/DOG/DELETE ----------------------------

export function deleteDog(id) {
    return async function (dispatch) {
        try {
            const deleteDog = await axios.delete(`
            http://localhost:3001/dogs/${id}`)
            return dispatch({
                type: "DELETE_DOG",
                payload: deleteDog.data
            })
        } catch(error) {
            console.log("Error deleting the dog", error)
        }
    }
}

export function orderByWeight(payload) {
    return {
        type: "ORDER_BY_WEIGHT",
        payload,
    };
}