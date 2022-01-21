import React from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Link} from 'react-router-dom';
import Card  from "../Card/Card";
import Paginated from '../Paged/Paged';
import SearchBarDog from "../SearchBar/SearchBar";
import s from './Home.module.css';

import {getAllDogs,
        getDogsTemperaments,
        filterDogWeight,
        filterDogOrigin,
        filterDogName,
        filterDogTemperaments,
       
        } from '../../actions/index.actions';

export default function Home(){

    const dispatch = useDispatch();

    // se traen los datos de los estados globales.
    const allDogs = useSelector((state) => state.dogs);
    const allTemperaments = useSelector((state) => state.dogsTemperaments);

    // Estado de ordenamiento por nombre
    const [order, SetOrder] = useState('');


    const [alert,setAlert] = useState({a: ''});

    

    // Paginado de la aplicación.

    // estado currentPage setea la pagina actual
    const [currentPage, SetCurrentPage] = useState(1);
    // estado dogsPerPage setea el numero de dogs por pagina.
    const [dogsPerPage, setDogsPerPage] = useState(8);
    // indexOfLastDog guarda el index del ultimo dog de la operacion currentPage * dogsPerPage.
    const indexOfLastDog = currentPage * dogsPerPage;
    // indexOfFirstDog guarda el index del primer dog de la operacion indexOfLastDog - dogsPerPage.
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    // currentDogs guarda los index de los dogs que se van a renderizar en cada pagina de apliacer un slice a allDogs con el numero de inicio y de final.
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

    // Funcion Paginated que setea el estado local currentPage con la pagina actual.
    const paginated = (pageNum) => {
        SetCurrentPage(pageNum);
    }

    // console.log('AAAAAA',allDogs)
    // se cargan por primera vez los datos con el metodo useEffect llamando a la action getAllDogs, getDogsTemperaments
    useEffect(() => {
        
        dispatch(getAllDogs());
        dispatch(getDogsTemperaments());
        
    },[]);


    // recargar los datos de la pagina 
    function buttonClick(e){

        e.preventDefault();
        dispatch(getAllDogs());
    };


    // funcion select Weight envia al action filterDogWeight el valor del select para filtrarlo
    function handleFilterByWeight(e){
        e.preventDefault();
        dispatch(filterDogWeight(e.target.value));
        SetCurrentPage(1);
    };

    // ordenar por origen (api o DB) envia al action filterDogOrigin el valor del select para filtrarlo
    function handleByOrigin(e){

        dispatch(filterDogOrigin(e.target.value))
        SetCurrentPage(1);
    };

    // ordenar por nombre (asc o desc) envia al action filterDogName el valor del select para filtrarlo
    function handleByName(e){
        
        e.preventDefault();
        dispatch(filterDogName(e.target.value));
        SetCurrentPage(1);
        SetOrder(`Order ${e.target.value}`)
    };

    // filtrar por temperamento envia al action filterDogTemperaments el valor del select para filtrarlo
    function handleFilterByTemperaments(e){
        
        e.preventDefault();
        dispatch(filterDogTemperaments(e.target.value));
        SetCurrentPage(1);

    };
   


    
    
    // Se renderiza en component Home
    return(

        <div>
            <h1 className={s.title}>My Best Friend</h1>

            <Link  to={'/createDog'}>
                <button className={s.buttonCreate}>Create Breed</button>
            </Link>

            

            <button className={s.buttonReload} onClick={e => buttonClick(e)}>Reload Breeds</button>

            <div>

                <SearchBarDog/>

                {/* Filtrado por por raza creada o de la api */}
                <select className={s.selectOptions} onChange={e => handleByOrigin(e)}>
                    
                    <option value={'all'}>All Breeds</option>
                    <option value={'api'}>Breeds Api</option>
                    <option value={'breedDB'}>Breeds Created</option>

                </select>
            </div>

            <div>
                {/* Filtrado alfabetico */}
                <select className={s.selectOptions} onChange={(e) => handleByName(e)}>
                    <option defaultValue={'all'}>Name</option>
                    <option value={'asc'}>Ascendingly</option>
                    <option value={'desc'}>Descendingly</option>
                </select>
            </div>

            <div>
                {/* Filtrado por peso */}
                <select className={s.selectOptions} onChange={e => handleFilterByWeight(e)}>
                    <option value={'all'}>Weight</option>
                    <option value={'asc'}>High Weight</option>
                    <option value={'desc'}>low Weight</option>
                </select>
                
            </div>

            <div>
                {/* Filtrado por temperamentos */}
                <select className={s.selectOptions} onChange={e => handleFilterByTemperaments(e)}>
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
            
            {/* Card */}

            
            
            <div className={s.card} >
                {
                    // Mapear el resultado que llega de state
                    
                    
                   currentDogs.length > 0? 
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

                            <div >
                                {/* Se envia el Id de la raza para details */}
                                <Link className={s.link }to={`/home/${e.id}`} >
                               
                                    <Card 
                                        image={e.image} 
                                        name={e.name}
                                        weight={e.weight}
                                        temperament={e.temperament}
                                        id={e.id}
                                    />
                                </Link>
                            </div>
                        )
                    })

                    :
                    // Loader 
                    
                    <div className={s.preloader}></div> 

                    
    
                }

                {/* Prueba de la correcion del PI */}
                {/* <div>
                    {
                        //  allDogs.length < 1 ? <p className={s.alert}>Dog not found!!</p> : null

                        currentDogs.length < 1 ? <p className={s.alert}>Dog not found</p> : null
                    }
                </div>
            */}

            </div>

        </div>
    )
}
