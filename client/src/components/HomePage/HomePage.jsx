import React from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Link} from 'react-router-dom';
import Card  from "../Card/Card";
import Paginated from '../Paged/Paged';
import SearchBarDog from "../SearchBar/SearchBar";
import style from './Home.style.css';

import {getAllDogs,
        getDogsTemperaments,
        filterDogWeight,
        filterDogOrigin,
        filterDogName,
        filterDogTemperaments,
       
        } from '../../actions/index.actions';

export default function Home(){

    const dispatch = useDispatch();

    const allDogs = useSelector((state) => state.dogs);
    const allTemperaments = useSelector((state) => state.dogsTemperaments);

    // Estado de ordenamiento por nombre
    const [order, SetOrder] = useState('');

    

    // Paginado de la aplicación.

    const [currentPage, SetCurrentPage] = useState(1);
    const [dogsPerPage, setDogsPerPage] = useState(8);
    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

    const paginated = (pageNum) => {
        SetCurrentPage(pageNum);
    }

    // console.log('AAAAAA',allDogs)
    // se cargan por primera vez los datos con el metodo useEffect llamando a la action getAllDogs
    useEffect(() => {
        
        dispatch(getAllDogs());
        dispatch(getDogsTemperaments());
        
    },[]);


    // recargar los datos de la pagina 
    function buttonClick(e){

        e.preventDefault();
        dispatch(getAllDogs());
    };


    // funcion select Weight
    function handleFilterByWeight(e){
        e.preventDefault();
        dispatch(filterDogWeight(e.target.value));
        SetCurrentPage(1);
    };

    // ordenar por origen (api o DB)
    function handleByOrigin(e){

        dispatch(filterDogOrigin(e.target.value))

    };

    // ordenar por nombre (asc o desc)
    function handleByName(e){
        
        e.preventDefault();
        dispatch(filterDogName(e.target.value));
        SetCurrentPage(1);
        SetOrder(`Order ${e.target.value}`)
    };

    // filtrar por temperamento
    function handleFilterByTemperaments(e){
        
        e.preventDefault();
        dispatch(filterDogTemperaments(e.target.value));
        SetCurrentPage(1);

    };

    console.log('QQQQQ', currentDogs.length)

    return(

        <div>
            <Link to={'/createDog'}>
                Create Breed
            </Link>

            <h1>Canine Atlas    </h1>

            <button onClick={e => buttonClick(e)}>Reload Breeds</button>

            <div>

                <SearchBarDog/>

                {/* Filtrado por por raza creada o de la api */}
                <select onChange={e => handleByOrigin(e)}>
                    
                    <option value={'all'}>All Breeds</option>
                    <option value={'api'}>Breeds Api</option>
                    <option value={'breedDB'}>Breeds Created</option>

                </select>
            </div>

            <div>
                {/* Filtrado alfabetico */}
                <select onChange={(e) => handleByName(e)}>
                    <option defaultValue={'all'}>Name</option>
                    <option value={'asc'}>Ascendingly</option>
                    <option value={'desc'}>Descendingly</option>
                </select>
            </div>

            <div>
                {/* Filtrado por peso */}
                <select onChange={e => handleFilterByWeight(e)}>
                    <option value={'all'}>Weight</option>
                    <option value={'asc'}>High Weight</option>
                    <option value={'desc'}>low Weight</option>
                </select>
                
            </div>

            <div>
                {/* Filtrado por temperamentos */}
                <select onChange={e => handleFilterByTemperaments(e)}>
                    <option value={'select'}>Select Temperament</option>
                    {
                        allTemperaments && allTemperaments.map((e) => 
                            <option value={e.name} key={e.id}>{e.name}</option>

                        )
                        
                    }
                    
                </select>
                
            </div>
            <br />

            {/* Paginado */}
            <Paginated
                dogsPerPage={dogsPerPage}
                allDogs={allDogs.length}
                paginated={paginated}
                currentPage={currentPage}
            />
            <br />
            {
                // Mapear el resultado que llega de state
                
                currentDogs && currentDogs.map(e => {
                    
                    // Los temperamentos de los dogs creados hay que pasarlos de array de objetos a string
                    // para que se puedan visualizar en la pagina
                    if(Array.isArray(e.temperaments)){
                        
                        let arr = [];

                        e.temperaments.forEach(e => {
                            arr.push(' '+e.name);
                        });

                        e.temperament = arr.toString()
                        
                    }
                    return(
                        // Se le pasa la data a el componente Card 

                        <div>
                            <Link to={`/home/${e.id}`}>

                                <Card 
                                    image={e.image} 
                                    name={e.name}
                                    weight={e.weight}
                                    temperament={e.temperament}
                                />
                            </Link>
                         </div>
                    )
                })

                
   
            }

        </div>
    )
}
