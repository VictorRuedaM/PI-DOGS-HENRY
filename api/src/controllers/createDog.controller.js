const {Dog, Temperament} = require('../db');


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

    if(name && height && weight && life_span && temperament){

        try {
            const createdDog = await Dog.create({
                name,
                height,
                weight,
                life_span,
                createdInDb,
                image
                
            });
        
            const temperamentsDB = await Temperament.findAll({
                where: {name: temperament}
            });
            
            


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