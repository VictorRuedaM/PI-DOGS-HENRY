import React from "react";

export default function Card(props){

    const {image, name, temperament, weight} = props;

    

    return(

        
        <div>
            <img src={image} alt="Dog" width='200px' height='200px' />
            <h2>{name}</h2>
            <h4>Weight: {weight} Kg.</h4>
            <h4>Temperaments: {temperament}</h4>
            <hr />
            <br/>
        </div>
    );

}