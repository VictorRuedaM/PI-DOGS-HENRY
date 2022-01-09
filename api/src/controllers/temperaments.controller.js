const {getAllDogs} = require('./dog.controller');
const {Temperament} = require('../db');


const getDogTemperaments = async () => {

    try {
        const dogsInfo = await getAllDogs();

        let dogsTemperaments = await dogsInfo.map(e => e.temperament);

        // let dataTem = dogsTemperaments.toString().split(/\s*,\s*/).filter(e => e !== '');
        // Se unen las cadenas y se separa por las comas
        let dataTem = dogsTemperaments.join().split(',')
        // Se eliminan los espacios en blanco a cada lado de las cadenas
        dataTem = dataTem.map(e => e.trim());

        // Se crea una instancia de Set para que devuelve una coleccion con los temperamentos no repetidos.
        // const set = new Set(dataTem)
        // console.log('DATA',dataTem)

        // Se agregan los temperamentos a la base de datos local 
        dataTem.forEach(e => {

            if(e !== ''){
                Temperament.findOrCreate({
                    where: {name: e}
                })
            }
        });

        // for(el of dataTem){
        //     Temperament.findOrCreate({
        //         where: {name: el}
        //     })
        // }

        const temperamentsDB = await Temperament.findAll();
        // console.log('FDFDFD',temperamentsDB)
        return temperamentsDB;
    } catch (error) {
        console.log(`<<<Error in [getDogTemperaments] ${error}>>>`);
        return 500
    }
};


module.exports = {getDogTemperaments};