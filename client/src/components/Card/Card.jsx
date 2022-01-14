import React from "react";
import s from './Card.module.css';

export default function Card(props){

    const {image, name, temperament, weight} = props;

    

    return(

        
        <div className={s.container}>
            <div className={s.card}>
                <img className={s.image} src={image} alt="Dog"  />
                <h2>{name}</h2>
                <h4>Weight: {weight} Kg.</h4>
                <h4>Temperaments: {temperament}</h4>
               
            </div>
        </div>
    );

}