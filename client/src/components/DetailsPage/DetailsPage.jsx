import React from "react";
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Link, useParams} from 'react-router-dom';
import {getDogDetail} from '../../actions/index.actions';
import s from './Detail.module.css';


// Funcion DetailsPage que renderiza los detalles de cada raza cuando si da click en cada Card en el home
// recibe mediante url el Id de la raza selecionada. 
export function DetailsPage(){

    const {id} = useParams();
    
    const dispatch = useDispatch();

    useEffect(() => {
        // Se envia el Id a la action getDogDetail para obtener la data de la raza
        dispatch(getDogDetail(id));
    },[dispatch]);

    const dog = useSelector((state) => state.dogDetail);
    
    // console.log('>>>>>>>>>>>>>>>>>>>>>',dog[0].temperaments[1])
    // Se renderiza la card de details.
    return(

        <div className={s.container}>
            <div className={s.detailCard}>
                {
                    

                    dog.length > 0 ?

                    
                    <div>
                        <img className={s.detailImage} src={dog[0].image} alt="Dog" width={'250px'} height={'250px'}/>
                        <h1>Name: {dog[0].name}</h1>
                        <h2>Height: {dog[0].height} cm</h2>
                        <h2>Weight: {dog[0].weight} Kg</h2>
                        <h2>Life Span: {dog[0].life_span}</h2>
                        <h2>Temperamente: {Array.isArray(dog[0].temperaments) ? dog[0].temperaments.map(e => e.name + (' ')) : dog[0].temperament}</h2>
                        
                    </div>
                    :
                    <div className={s.preloader}></div>
                }

                <Link to={'/home'}><button className={s.buttonGoBack}>Go back to home</button></Link>
            </div>
        </div>
    )
}

