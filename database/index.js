const Sequelize = require("sequelize");
const { creaModelBanda } = require("../database/models/bandas.js");
const { creaModelAlbumes } = require("../database/models/albumes.js");
const { creaModelCanciones } = require("../database/models/canciones.js");


const models = {};

async function connect(host, port, username, password, database) {
    
    const sequelize = new Sequelize({
        database,
        username,
        password,
        host,
        port,
        dialect: 'mariadb',
    });
    
    models.Bandas = creaModelBanda(sequelize);
    models.Albumes = creaModelAlbumes(sequelize);
    models.Canciones = creaModelCanciones(sequelize);
  
    models.Bandas.hasMany(models.Albumes);
    models.Albumes.belongsTo(models.Bandas);

    models.Albumes.hasMany(models.Canciones);
    models.Canciones.belongsTo(models.Albumes);

    models.Bandas.hasMany(models.Canciones);
    models.Canciones.belongsTo(models.Bandas);

    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

function getModel(name) {
    if (models[name]) {
        return models[name];
    } else {
        console.error(`Model ${name} does not exists.`);
        return null;
    }
}

module.exports = {
    connect,
    getModel
};
