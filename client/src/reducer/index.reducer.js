import {GET_ALL_DOGS, 
        GET_ALL_TEMPERAMENTS,
        FILTER_BY_WEIGHT,
        FILTER_BY_ORIGIN,
        FILTER_BY_NAME,
        FILTER_BY_TEMPERAMENT,
        GET_ONE_DOG,
        CREATE_DOG_DB,
        GET_DOG_DETAIL,
        DOG_NOT_FOUND,
        CLEAR_DETAILS
    } from '../actions/actionsExports';


const initialState = {

    dogs : [],
    allDogs: [],
    dogsTemperaments: [],
    allDogsTemperaments: [],
    dogDetail: [],
    
};

const rootReducer = (state= initialState, action) => {

    switch(action.type){
        // Guarda todos los dogs en el estado.
        case GET_ALL_DOGS:
            
            return{
                ...state,
                dogs: action.payload,
                allDogs: action.payload
                
            }
        // Guarda el dog buscado por nombre.
        case GET_ONE_DOG:
            // console.log('HHHHH',action.payload)
            return{
                ...state,
                dogs: action.payload 

            }

        // Guarda los temperamtos en su estado. 
        case GET_ALL_TEMPERAMENTS:
            
            return{
                ...state,
                dogsTemperaments: action.payload,
                allDogsTemperaments: action.payload
            }
        
        // Guarda los pesos filtrados desde el back.
        case FILTER_BY_WEIGHT:

                       
            return{
                ...state,
                dogs: action.payload
            }

        // Filtra los dogs por origen sea de la apo o la DB.
        case FILTER_BY_ORIGIN:

            const allDogs = state.allDogs;
            const originFilter = action.payload === 'api' ? allDogs.filter(e => !e.createdInDb) : allDogs.filter(e => e.createdInDb)
            return{
                ...state,

                dogs: action.payload === 'all' ? state.allDogs : originFilter
            }
        

        // Filtra los dogs alfabeticamente ordenando asc o desc con el metod sort.
        case FILTER_BY_NAME:

            let filterName;

            if(action.payload === 'asc'){

                filterName = state.dogs.sort(function(a, b){
                    if(a.name > b.name){
                        return 1;

                    }else if(b.name > a.name){
                        return -1;
                    }else{
                        return 0;
                    }
                });

            }else{
                
                filterName = state.dogs.sort(function(a, b){
                    if(a.name > b.name){
                        return -1;

                    }else if(b.name > a.name){
                        return 1;
                    }else{
                        return 0;
                    }
                });
            }
            return{
                ...state,
                dogs : action.payload === 'all' ? state.allDogs : filterName
            }

        // Filtra los dogs por el temperamtento seleccionado.
        case FILTER_BY_TEMPERAMENT:
            
            const dogs = state.allDogs;
            
            
            const fileterTemperament =  dogs.filter((e) => e.temperament && e.temperament.includes(action.payload));
            
           

            return{
                ...state,
                dogs:  action.payload === 'select' ? state.allDogs : fileterTemperament
            }

        // Crea un dog en la DB.

        case CREATE_DOG_DB:

            return{
                ...state,

            }
        
        // Guarda el detalle del dog que se paso por Id.
        case GET_DOG_DETAIL:

            return{
                ...state,
                dogDetail: action.payload
            }
        
        // Limpia el estado de los detalles para que no se vea el dog anterior cuando se renderice uno nuevo.
        case CLEAR_DETAILS:

            return{
                ...state,
                dogDetail: []
            }

        default:
            return{
                ...state
            }
    }

};

export default rootReducer;