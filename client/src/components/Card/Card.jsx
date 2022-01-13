import React from "react";
import './Card.styles.css';

export default function Card(props){

    const {image, name, temperament, weight} = props;

    

    return(

        
        <div className="contenedor">
            <div className={'card'}>
                <img className='imgPerro' src={image} alt="Dog" width='200px' height='200px' />
                <h2>{name}</h2>
                <h4>Weight: {weight} Kg.</h4>
                <h4>Temperaments: {temperament}</h4>
               
            </div>
        </div>
    );

}