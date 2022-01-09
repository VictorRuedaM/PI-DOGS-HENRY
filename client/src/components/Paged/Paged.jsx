import React from "react";
import style from './Paged.css';




export default function Paginated({dogsPerPage, allDogs, paginated, currentPage}){

    const numberOfPage = [];

    for(let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++){

        numberOfPage.push(i);
    };

    return (

        <nav>
            <ul className='pagination'>
                {
                    numberOfPage && numberOfPage.map(n => (
                            <li key={n} >
                                
                                <a href="#" onClick={() => paginated(n)} >{n}</a>
                            </li>
                    ))
                    
                }
            </ul>
        </nav>
    )
}