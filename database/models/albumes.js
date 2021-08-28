const { DataTypes } = require('sequelize');

function creaModelAlbumes(connection) {
  const Album = connection.define('Albumes', {
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
  return Album;
}

module.exports = {
  creaModelAlbumes
}
