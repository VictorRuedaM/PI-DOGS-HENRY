import React from "react";
import s from './Card.module.css';

export default function Card(props){

    const {image, name, temperament, weight, id} = props;

    
    // compornente Card encargado del renderizado de cada raza en el home.
    // recibe los parametros por props desde en home.
    return(

        
        <div className={s.container} key={id}>
            <div className={s.card}>
                <img className={s.image} src={image} alt="Dog"  />
                <h2>{name}</h2>
                <h4>Weight: {weight} Kg.</h4>
                <h4>Temperaments: {temperament}</h4>
               
            </div>
        </div>
    );

}