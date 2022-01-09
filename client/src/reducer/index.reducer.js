import {GET_ALL_DOGS, 
        GET_ALL_TEMPERAMENTS,
        FILTER_BY_WEIGHT,
        FILTER_BY_ORIGIN,
        FILTER_BY_NAME,
        FILTER_BY_TEMPERAMENT
    } from '../actions/actionsExports';


const initialState = {

    dogs : [],
    allDogs: [],
    dogsTemperaments: [],
    allDogsTemperaments: []
};

const rootReducer = (state= initialState, action) => {

    switch(action.type){

        case GET_ALL_DOGS:
            
            return{
                ...state,
                dogs: action.payload,
                allDogs: action.payload
                
            }

        case GET_ALL_TEMPERAMENTS:

            return{
                ...state,
                dogsTemperaments: action.payload,
                allDogsTemperaments: action.payload
            }
        
        case FILTER_BY_WEIGHT:

                       
            return{
                ...state,
                dogs: action.payload
            }

        case FILTER_BY_ORIGIN:

            const allDogs = state.allDogs;
            const originFilter = action.payload === 'api' ? allDogs.filter(e => !e.createdInDb) : allDogs.filter(e => e.createdInDb)
            return{
                ...state,

                dogs: action.payload === 'all' ? state.allDogs : originFilter
            }

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

        case FILTER_BY_TEMPERAMENT:
            
            const dogs = state.allDogs;
            
            
            const fileterTemperament =  dogs.filter((e) => e.temperament && e.temperament.includes(action.payload));
            
           

            return{
                ...state,
                dogs:  action.payload === 'select' ? state.allDogs : fileterTemperament
            }

        default:
            return{
                ...state
            }
    }

};

export default rootReducer;