const { DataTypes } = require('sequelize');

function creaModelCanciones(connection) {
  const Cancion = connection.define('Canciones', {
    nombre: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT
    },
    anio_creacion:{
      type: DataTypes.DATE
    },
  })
  return Cancion;
}

module.exports = {
  creaModelCanciones
}
