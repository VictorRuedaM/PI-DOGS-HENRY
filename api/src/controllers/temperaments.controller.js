const {getAllDogs} = require('./dog.controller');
const {Temperament} = require('../db');

// Funcion que obtine los temperamentos y los guarda en la base de datos
const getDogTemperaments = async () => {

    try {
        // se llama a la funcion controladora getAllDogs para obtener todos los datos de las razas de la api
        // de la data devuelta se extraen los temperamentos
        const dogsInfo = await getAllDogs();

        let dogsTemperaments = await dogsInfo.map(e => e.temperament);

     
        // Se unen las cadenas y se separa por las comas
        let dataTem = dogsTemperaments.join().split(',')
        // Se eliminan los espacios en blanco a cada lado de las cadenas
        dataTem = dataTem.map(e => e.trim());


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