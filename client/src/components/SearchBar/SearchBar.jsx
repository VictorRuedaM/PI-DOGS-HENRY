import React from "react";
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {getOneDog} from '../../actions/index.actions';



export default function SearchBarDog(){

    const dispatch = useDispatch();

    const [name, SetName] = useState('');


    // funcion que toma los cambios del input y los guarda en el estado local 
    function handleInput(e){

        e.preventDefault();
        if(e.target.value && typeof e.target.value  === 'string'){
            SetName(e.target.value);
        }
        console.log('NAME',name)
    };

    // SearchBar bucar por nombre de raza pasada por query
    function handleSubmit(e){
        e.preventDefault();
        
        dispatch(getOneDog(name));
        SetName('')
    };

    return (

        <div>

            <input type="text"  placeholder="Search Breed..." value={name} onChange={(e) => handleInput(e)}/>
            
            <button type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
}