const { DataTypes } = require('sequelize');

function creaModelBanda(connection) {
  const Banda = connection.define('Bandas', {
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
  return Banda;
}

module.exports = {
  creaModelBanda
}
