const {Dog, Temperament} = require('../db');

// funcion que crea una nueva raza en la base de datos de acuerdo a la data recibida por body del front.
const createDog = async (req) => {

    console.log('REQ',req.body)
    const {
        name,
        height,
        weight,
        life_span,
        createdInDb,
        image,
        temperament
    } = req.body;

    console.log('GGGGG', name.length)

    if(name && height && weight && life_span && temperament){

        try {
            // Se crea la raza con los campos requiridos.
            const createdDog = await Dog.create({
                name,
                height,
                weight,
                life_span,
                createdInDb,
                image
                
            });
            
            // se buscan los temperamentos seleccionados en el front de la raza a crear en la base de datos 
            const temperamentsDB = await Temperament.findAll({
                where: {name: temperament}
            });
            
            

            // Se agregan los temperamentos a la raza en el modelo utilizando el metodo que nos provee sequelize add
            createdDog.addTemperament(temperamentsDB);
        
            return 'Dog created successfully...';
        
        } catch (error) {
            console.log(`<<<Error in [createDog] ${error}>>>`);
            return 500
        }

    }else{
        return 'All fields are required...'
    }

};

module.exports = {createDog};