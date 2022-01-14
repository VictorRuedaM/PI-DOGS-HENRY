import React from "react";
import s from './Paged.module.css';




export default function Paginated({dogsPerPage, allDogs, paginated, currentPage}){

    const numberOfPage = [];

    for(let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++){

        numberOfPage.push(i);
    };

    return (

        <nav>
            <ul className={s.pagination}>
                {
                    numberOfPage && numberOfPage.map(n => (
                            <li key={n}  >
                                
                                <a className={
                  currentPage === n ? s.active : s.pagination
                } href="#" onClick={() => paginated(n)} >{n}</a>
                            </li>
                    ))
                    
                }
            </ul>
        </nav>
    )
}