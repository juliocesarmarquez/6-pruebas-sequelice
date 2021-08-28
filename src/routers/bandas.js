const express = require("express");
const { getModel } = require("../../database/index.js");
const bandaRouter = express();

bandaRouter.get("/bandas", async (req, res) => {
    try {
        const ban = await getModel('Bandas').findAll();
        res.status(200).json(ban);
    } catch {
        res.status(404).json(`No existen bandas`);
    }
})


bandaRouter.post("/bandas", async (req, res) => {
    try {
        const Banda = getModel('Bandas');
        const ban = new Banda({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            anio_creacion: req.body.anio_creacion
        })
        await ban.save();
        return res.status(200).json(`La banda ${ban.nombre} fue cargada de manera exitosa`);
    } catch {
        res.status(404).json(`La banda no pudo ser cargada`);
    }
})

bandaRouter.put("/bandas/:id", async (req, res) => {
    try {
        const ban = await getModel('Bandas').findOne({
            where: {
                id: req.params.id
            }
        });
        ban.descripcion = req.body.descripcion;
        ban.save();
        res.status(200).json(ban);
    } catch {
        res.status(404).json(`No hay bandas`);
    }
})

bandaRouter.delete("/bandas/:id", async (req, res) => {
    try {
        const ban = await getModel('Bandas').findOne({
            where: {
                id: req.params.id
            }
        });
        ban.destroy();
        res.status(200).json(`La banda ha sido eliminada` );
    } catch {
        res.status(404).json(`No hay bandas`);
    }
})

module.exports = {
    bandaRouter
}
