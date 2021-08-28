const express = require("express");
const { getModel } = require("../../database/index.js");
const cancionRouter = express();

cancionRouter.get("/canciones", async (req, res) => {
    try {
        const can = await getModel('Canciones').findAll();
        res.status(200).json(can);
    } catch(error) {
        console.log(error);
        res.status(404).json(`No hay canciones`);
    }
})


cancionRouter.post("/canciones", async (req, res) => {
    try {
        const Cancion = getModel('Canciones');
        const can = new Cancion({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            anio_creacion: req.body.anio_creacion
        })
        await can.save();
        return res.status(200).json(`La canción ${can.nombre} ha sigo guardada`);
    } catch {
        res.status(404).json(`La canción no ha podido ser cargada`);
    }
})

cancionRouter.put("/canciones/:id", async (req, res) => {
    try {
        const can = await getModel('Canciones').findOne({
            where: {
                id: req.params.id
            }
        });
        can.descripcion = req.body.descripcion;
        can.save();
        res.status(200).json(can);
    } catch {
        res.status(404).json(`No hay canciones`);
    }
})

cancionRouter.delete("/canciones/:id", async (req, res) => {
    try {
        const can = await getModel('Canciones').findOne({
            where: {
                id: req.params.id
            }
        });
        can.destroy();
        res.status(200).json(`La cancíón ha sido eliminada` );
    } catch {
        res.status(404).json(`No hay canciones`);
    }
})

module.exports = {
    cancionRouter
}
