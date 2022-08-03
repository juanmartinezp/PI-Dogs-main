const initialState = {
    dogs: [],
    allDogs: [],
    allTemperament: [],
    dogDetail: [],
}


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_ALL_DOGS':
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload,
                dogDetail: [],
            }

        case 'GET_ALL_TEMPERAMENT':
            return {
                ...state,
                allTemperament: action.payload,
            }

            case 'FILTER_BY_TEMPERAMENT':

            const newDog = state.allDogs.filter(e => e.temperaments);
            const filteredByTypes = newDog.filter(e => {

                if(typeof (e.temperaments) === 'string') {
                    return e.temperaments.includes(action.payload);
                }

                if(Array.isArray(e.temperaments)) {
                    const tempDB = e.temperaments.map(e => e.name);
                    return tempDB.includes(action.payload);
                }

                return ('Temperament not Found');

            })

            return {
                ...state,
                dogs: action.payload === 'all' ? newDog : finlteredByTypes,
            }

            case 'ORDER_BY_ALPHABET':

            const order = action.payload === 'des' ?
                state.dogs.sort(function (a,b) {

                    if(a.name > b.name) {
                        return -1;
                    }

                    if(b.name > a.name) {
                        return 1;
                    }

                    return 0;
                }) :

                state.dogs.sort(function (a, b) {

                    if(a.name > b.name) {
                        return 1;
                    }

                    if(b.name > a.name) {
                        return -1;
                    }

                    return 0;
                })

            return {
                ...state,
                dogs: action.payload === 'allApi' ? state.allDogs : order
            }

        case 'FILTER_BY_ORIGIN':
            const all = state.allDogs;
            const iriginFiltered = action.payload === 'all' ? all : action.payload === 'created' ? all.filter(e => e.CreatedInDB) : all.filter(e => !e.CreatedInDB);
            return {
                ...state,
                dogs: iriginFiltered
            }

        case 'ORDER_BY_WEIGHT':
            const orderedWeightfiltered = state.allDogs.filter(e => e.weightMax);
            const orderedWeight = action.payload === 'asc' ?
                orderedWeightfiltered.sort(function (a, b) {
                    return(a.weightMax) - (b.weightMax);
                }) :
                roderedWeightfiltered.sort(function (a, b) {
                    return(b.weightMax) - (a.weightMax);
                })
            return {
                ...state,
                dogs: orderedWeight,
            }

        case 'GET_BY_NAME':
            return {
                ...state,
                dogs: action.payload
            }
        
        case 'GET_DETAIL':
            return {
                ...state,
                dogDetail: action.payload
            }

        case 'POST_DOGS':
            return {
                ...state,
            }
        
        case 'DELETED_DOG':
            return {
                ...state,
            }

        default:
            return state;
    }
}


export default rootReducer;