const initialState = {
    loading: false,
    dogs: [],
    allDogs: [],
    allTemperaments: [],
    dogDetail: []
}

function rootReducer(state = initialState, action) {

    switch(action.type) {

        case "LOADING":
            return {
                ...state,
                loading: action.payload
            }

        case "GET_ALL_DOGS":
            return {
                ...state,
                dogs: [...action.payload],
                allDogs: [...action.payload],
            }
        
        case "GET_DOGS_TEMPERAMENT":
            return {
                ...state,
                allTemperaments: action.payload,
            }

        case "GET_TEMPERAMENT_FILTERED":

            const allDogs = state.allDogs
            const filtered = action.payload === 'all' ? allDogs 
            : allDogs.filter(e => { 
                if (e.temperament) {
                    return e.temperament.includes(action.payload);
                } else if (e.temperament) {
                    let temps = e.temperament.map(e => e.name);
                    return temps.includes(action.payload);
                }
                return true;
            });

            return {
                ...state,
                dogs: filtered
            };

        case "GET_ABC_ORDERED":

            let abc = state.allDogs.sort(function(a, b){
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                return 0;
            });
            return {
                ...state,
                dogs: abc
            }
        case "GET_CBA_ORDERED":
            
            let cba = state.allDogs.sort(function(a, b){
                if (a.name > b.name) return -1;
                if (a.name < b.name) return 1;
                return 0;
            });
            return {
                ...state,
                dogs: cba
            };

        case 'ORDER_BY_WEIGHT':
            const allWeights = state.allDogs;
            const orderedWeights = 
            action.payload === 'Asc'? allWeights.sort(function(a, b) {
                if (a.weight > b.weight) return 1;
                if (a.weight < b.weight) return -1;
                return 0;
            })
            : action.payload === 'Desc'? allWeights.sort(function(a, b) {
                if (a.weight > b.weight) return -1;
                if (a.weight < b.weight) return 1;
                return 0;
            })
            : allWeights

            return {
                ...state,
                dogs: orderedWeights
            };


        case "GET_ORDER_BY_CREATION":
                const creationOrder = action.payload === "Created" ? state.allDogs.filter(e => e.createdInDb) : state.allDogs.filter(element => !element.createdInDb)
                    return {
                        ...state,
                        dogs: creationOrder
                    }

        case "GET_DOGS_BY_NAME":
            return {
                ...state,
                dogs: action.payload
            }

        case "GET_DOG_DETAIL":
            return {
                ...state,
                dogDetail: action.payload
            }

        case "DELETE_DOG":
            return {
                ...state,
            }
            
        default: 
        return {...state}
    }
}

export default rootReducer;