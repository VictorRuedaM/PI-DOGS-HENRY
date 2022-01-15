const {DataTypes} = require('sequelize');
// se define el modelo temperament que almacenara los distintos temperamentos proveneientes de la base de datos
// para ser usados en el filtrado por temperamento y la creacion local de nuevas razas.
// Se injecta la conexion a sequelize a la funcion.
module.exports = (sequelize) => {

    sequelize.define('temperament', {

        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}