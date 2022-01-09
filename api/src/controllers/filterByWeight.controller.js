const {getAllDogs} = require('../controllers/dog.controller');



const filterByWeight =  async (value) => {

    const dogs = await getAllDogs();

    let filterWeight;

    if(value === 'asc'){

        filterWeight = dogs.sort(function(a, b){
            // console.log(parseInt(a.weight.slice(0,3)),'--',parseInt(b.weight.slice(0,3)))

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
    }else if(value === 'desc'){

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
};

module.exports = {filterByWeight};