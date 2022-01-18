import React from "react";
import s from './Paged.module.css';



// Funcion Paginated que crea y renderiza el paginado 
export default function Paginated({dogsPerPage, allDogs, paginated, currentPage}){

    const numberOfPage = [];
    // Se recorre un for por el resultado de el total de dogs dividido por el numero por paginas, eso dara el numero de paginas a rendeirizar.
    for(let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++){
        // Se guarda cada numero de pagina en el array
        numberOfPage.push(i);
    };

    return (

        <nav>
            <ul className={s.pagination}>
                {
                    // Se renderiza el paginado recorriendo el array.
                    numberOfPage && numberOfPage.map(n => (
                            <li key={n}  >
                                
                                <a className={
                // Si la pagina en currentPage es igual a el numero de pagina se le da la clase active para indicar al usuario en que pagina esta.
                  currentPage === n ? s.active : s.pagination
                } href="#" onClick={() => paginated(n)} >{n}</a>
                            </li>
                    ))
                    
                }
            </ul>
        </nav>
    )
}