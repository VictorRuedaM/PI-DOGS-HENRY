const axios = require('axios');
const apiKey = require.resolve('../../.env')
const {Dog, Temperament} = require('../db');


// funcion que consulta a la api para obtener todos los dogs
const getDogApi = async () => {

   try {
        const urlApi = await axios.get(`https://api.thedogapi.com/v1/breeds?${apiKey}`);

        // Mapear la data recibida para obtener solo los datos necesarios de cada raza.
        const dogApi = await urlApi.data.map((e) => {
        return {
            id: e.id,
            name: e.name,
            height: e.height.metric,
            weight: e.weight.metric,
            life_span: e.life_span,
            image: e.image.url,
            temperament: e.temperament,
        };
        });
        // console.log('GEEEETTTAAA',dogApi)
        return dogApi;

   } catch (error) {
       console.log(`<<<Error in [getDogApi] ${error}>>>`);
       return 'Api error';
   }

};

// funcion para obtener los datos de la base de datos local de las razas creadas.
const getDogDB = async () => {

    try {
        const dogDb = await Dog.findAll({
            // se incluye el temperamento de la tabla temperament para cada raza
            include:{
                model: Temperament,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        });
        
        
        return dogDb;

    } catch (error) {
       console.log(`<<<Error in [getDogDB] ${error}>>>`);
       return 'DB error';
    }
};


// Ejecutar las funciones getDogApi y getDogDB para obtener sus datos, unirlos
//  y devolverlos a la ruta en un array.
const getAllDogs = async () => {
    
    try {
        const api = await getDogApi();
        const db = await getDogDB();

        const totalData = await [...api, ...db];

        return totalData;

    } catch (error) {
       console.log(`<<<Error in [getAllDogs] ${error}>>>`);
       return 'Imposible to get all dogs...';
    }
};


module.exports = {getAllDogs};