const { Router } = require('express');
const axios = require('axios');
require('dotenv').config();
const {Temperament} = require('../db')

const {getAllDogs} = require('../controllers/dog.controller');
const {getDogTemperaments} = require('../controllers/temperaments.controller');
const {createDog} = require('../controllers/createDog.controller');
const {filterByWeight} = require('../controllers/filterByWeight.controller');



// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// const {apiKey} =process.env;


// Ruta /dogs devuelve los elementos unidos de la api y la DB local
// Si se pide por query el nombre de una raza en particular la devolvera haciendo uso de la misma funcion 
// de dog.controller getAllDogs
router.get('/dogs', async (req, res) => {
    
    const {name} = req.query;

    try {
        let dogsData = await getAllDogs();

        
        
        if(name){
            // Filtrado para obtener la raza requirida
            let dog = await dogsData.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));

            if(dog.length > 0) return res.status(200).json(dog);
            else res.status(404).json('There are no breeds of dogs with that name...');

        }else{
            return res.status(200).json(dogsData);
        }

    } catch (error) {
        console.log(`<<<Error in [/dogs] ${error}>>>`);
        res.status(500);
    }
});



// Ruta /dogs/:id devuelve la raza requerida segun el Id enviado por params.
router.get('/dogs/:id', async (req, res) => {

    const {id} = req.params;

    let dogsData = await getAllDogs();
    
    // Filtrado por Id para obtener la raza
    let dog = await dogsData.filter(e => e.id == id);
    console.log(dog)
    // console.log('DOG>>>', dogsData)
    if(dog.length > 0) return res.status(200).json(dog);
    else res.status(404).send('There are no breeds of dogs with that Id...');

    

});

// Ruta /temperament que obtiene los temperamentos de la api los procesa y los agrega a la base de datos.
router.get('/temperament', async (req, res) => {
    
    
    try {
        const temperaments = await getDogTemperaments();

        return res.send(temperaments)
    } catch (error) {
        console.log(`<<<Error in [/temperament] ${error}>>>`);
        return error;
    }
    
});


// Ruta /dog que crea una nueva raza de perro en la base de datos local.
router.post('/dog', async (req, res) => {
   
    const dogCreate = await createDog(req);

    res.send(dogCreate);
});


// Ruta /weight/:value devuelve las razas filtradas por peso asc o desc, el filtro es desde el Backend
router.get('/weight/:value', async (req, res) => {

    const {value} = req.params;

    const result = await filterByWeight(value)
    // console.log('RRRRRR',result)

    res.send(result);
})


// router.get('/', async (req, res) => {

//     const r = await axios.get(`https://api.thedogapi.com/v1/breeds?${apiKey}`)

//     res.json(r.data)
// })

// router.get('/one/:name', async (req, res) => {

//     const {name} = req.params;

//     console.log(name)

//     const r = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}&${apiKey}`)

//     res.json(r.data)
// })

module.exports = router;
