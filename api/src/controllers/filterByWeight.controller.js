const {getAllDogs} = require('../controllers/dog.controller');


// Funcion que filtra y ordena la data por peso de asc a desc deacuerdo a valor recibido del front.
const filterByWeight =  async (value) => {

    // Se obtine la data de las razas de la funcion controladora getAllDogs
    const dogs = await getAllDogs();

    try {
        let filterWeight;

        // Se ordena de forma ascendente por peso
        if(value === 'asc'){

            // Utilizando el metodo sort se ordena la data, ordenando de acuerdo a los valores negativos y 
            // positivos para dar el orden correcto.
            filterWeight = dogs.sort(function(a, b){
            
                // si uno de los valores no viene en la data de una raza se data prelevancia  a la otra raza contra la que se compara.
                if(isNaN(parseInt(a.weight.slice(0,2))) || isNaN(parseInt(b.weight.slice(0,2)))){
                    // console.log('GGGGGGGGGGGGG',parseInt(a.weight.slice(0,3)),'--',parseInt(b.weight.slice(0,2)))
                    if(isNaN(parseInt(a.weight.slice(0,2)))) return -1;
                    if(isNaN(parseInt(b.weight.slice(0,2)))) return 1
                }   



                if(parseInt(a.weight.slice(0,2)) > parseInt(b.weight.slice(0,2))){
                    return 1;
                }else if(parseInt(b.weight.slice(0,2)) > parseInt(a.weight.slice(0,2))){
                    return -1;
                }else{
                    return 0;
                }
            })
        }else if(value === 'desc'){ // Se ordena de forma descendente por peso

            filterWeight = dogs.sort(function(a, b){


                if(isNaN(parseInt(a.weight.slice(0,2))) || isNaN(parseInt(b.weight.slice(0,2)))){
                    // console.log('GGGGGGGGGGGGG',parseInt(a.weight.slice(0,2)),'--',parseInt(b.weight.slice(0,2)))
                    if(isNaN(parseInt(a.weight.slice(0,2)))) return -1;
                    if(isNaN(parseInt(b.weight.slice(0,2)))) return 1
                } 

                if(parseInt(a.weight.slice(0,2)) > parseInt(b.weight.slice(0,2))){
                    return -1;
                }else if(parseInt(b.weight.slice(0,2)) > parseInt(a.weight.slice(0,2))){
                    return 1;
                }else{
                    return 0;
                }
            })
        }

        filterWeight = filterWeight.filter(e => e.id !== 232 && e.id !== 179)
        // console.log('FFFFFIIIII',filterWeight)
        return filterWeight;

    } catch (error) {
        console.log(`<<<Error in [filterByWeight] ${error}>>>`);
    }
};

module.exports = {filterByWeight};