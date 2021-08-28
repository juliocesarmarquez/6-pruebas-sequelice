const express = require("express");
const { getModel } = require("../../database/index.js");
const albumRouter = express();

albumRouter.get("/albumes", async (req, res) => {
    try {
        
        const alb = await getModel('Albumes').findAll();
        res.status(200).json(alb);
    } catch {
        res.status(404).json(`No existen albumes`);
    }
})


albumRouter.post("/albumes", async (req, res) => {
    try {
        const Album = getModel('Albumes');
        const alb = new Album({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            anio_creacion: req.body.anio_creacion
        })
        await alb.save();
        return res.status(200).json(`El album ${alb.nombre} fue cargado de manera exitosa`);
    } catch {
        res.status(404).json(`El album no pudo ser cargado`);
    }
})

albumRouter.put("/albumes/:id", async (req, res) => {
    try {
        const alb = await getModel('Albumes').findOne({
            where: {
                id: req.params.id
            }
        });
        alb.descripcion = req.body.descripcion;
        alb.save();
        res.status(200).json(alb);
    } catch {
        res.status(404).json(`No hay albumes`);
    }
})

albumRouter.delete("/albumes/:id", async (req, res) => {
    try {
        const alb = await getModel('Albumes').findOne({
            where: {
                id: req.params.id
            }
        });
        alb.destroy();
        res.status(200).json(`El album ${alb.name} ha sido eliminado` );
    } catch {
        res.status(404).json(`No hay albumes`);
    }
})

module.exports = {
    albumRouter
}
