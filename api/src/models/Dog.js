const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo dog en la base de datos local con sus respectivos campos.
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    // UUID crea un Id alfanumerico en la base de datos lo cual permitira que no haya interferencia con los Ids de las razas provenientes de la api
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false
    },
    life_span: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // El campo createInDb se crea por default en tru para especificar que esa raza es creada en local y no proviene de la api.
    createdInDb:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }

  });
};
