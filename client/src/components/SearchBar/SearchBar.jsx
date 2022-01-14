import React from "react";
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getOneDog} from '../../actions/index.actions';
import s from './Search.module.css'



export default function SearchBarDog(){

    const dispatch = useDispatch();

    const notFound = useSelector((state) => state.dogs);

    const [name, setName] = useState('');


    // funcion que toma los cambios del input y los guarda en el estado local 
    function handleInput(e){

        e.preventDefault();
        if(e.target.value && typeof e.target.value  === 'string'){
            setName(e.target.value);
        }
        console.log('NAME',name)
    };

    // SearchBar bucar por nombre de raza pasada por query
    function handleSubmit(e){
        e.preventDefault();
        
        dispatch(getOneDog(name));
        setName('')
    };

    
    return (

        <div>
            
            <input className={s.search} type="text"  placeholder="Search Breed..." value={name} onChange={(e) => handleInput(e)}/>
            
            <button className={s.buttonSearch} type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
}