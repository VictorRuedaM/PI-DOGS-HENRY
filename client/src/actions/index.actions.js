import axios from 'axios';
import {GET_ALL_DOGS,
        GET_ALL_TEMPERAMENTS, 
        FILTER_BY_WEIGHT, 
        FILTER_BY_ORIGIN,
        FILTER_BY_NAME,
        FILTER_BY_TEMPERAMENT,
        GET_ONE_DOG
    } from './actionsExports';



export function getAllDogs(){

    return async (dispatch) => {

        let dogs = await axios.get('http://localhost:3001/dogs');
        // console.log(dogs.data)
        return dispatch({
            type: GET_ALL_DOGS,
            payload: dogs.data
        })
    }
  
};

export function getOneDog(value){

    return async (dispatch) => {

        let dog = await axios(`http://localhost:3001/dogs?name=${value}`);

        return dispatch({
                type: GET_ONE_DOG,
                payload: dog.data
        })
        
    }
}


export function getDogsTemperaments(){

    return async (dispatch) => {

        let temperaments = await axios.get('http://localhost:3001/temperament');
        // console.log('fSDFSDFSDFSDFSD',temperaments)
        return dispatch({
            type: GET_ALL_TEMPERAMENTS,
            payload: temperaments.data
        })
    }   
};

export function filterDogWeight(value){

    return async (dispatch) => {

        let filterWeight = await axios.get(`http://localhost:3001/weight/${value}`);

        return dispatch({
            type: FILTER_BY_WEIGHT,
            payload: filterWeight.data
        })
    }

};

export function filterDogTemperaments(value){

    return{
        type: FILTER_BY_TEMPERAMENT,
        payload: value
    }
}





export function filterDogName(value){
    
    return {
        type: FILTER_BY_NAME,
        payload: value
    }

};

// Filtrar por razas de la api y las creadas en la DB local
export function filterDogOrigin(value){

    return{
        type: FILTER_BY_ORIGIN,
        payload: value
    }

}


export function createDogDB(data){

    return async (dispatch) => {

        const result = await axios.post(`http://localhost:3001/dog${data}`);
        console.log(result)
        return result;
    }
}