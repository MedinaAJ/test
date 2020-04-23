const grupos = require('../models').grupos;
const sequelize = require('../models');
const grupo_plantilla = require('../models').grupo_plantilla;
const jwt = require('../services/jwt');

function create(req, res) {
    grupos.create(req.body)
        .then(grupos => {
            res.status(200).send({ grupos });
        })
        .catch(err => {
            res.status(500).send({ err });
        });
}

function createR(req, res) {
    grupo_plantilla.create(req.body)
        .then(grupo_plantilla => {
            res.status(200).send({ grupo_plantilla });
        })
        .catch(err => {
            res.status(500).send({ err });
        });
}

function getAll(req, res) {
    var id = req.params.id;

    sequelize.sequelize.query("SELECT o.id, o.name, a.id AS n_templates, o.createdAt, o.updatedAt FROM grupos o LEFT JOIN grupo_plantillas a ON (o.id = a.id_group AND o.id_empresa=" + id + ")  WHERE o.id_empresa = " + id + " GROUP BY o.id;", { type: sequelize.sequelize.QueryTypes.SELECT })
        .then(grupos => {
            res.status(200).send({ grupos });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al buscar la lista de grupos." });
        });
}

function getOne(req, res) {
    var id = req.params.id;

    grupos.findOne({
            where: {
                id: id
            }
        })
        .then(grupos => {
            res.status(200).send({ grupos });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al buscar las grupos" });
        })
}

function getTemplates(req, res) {
    var id_group = req.params.id;

    sequelize.sequelize.query(
            "SELECT * FROM plantillas p, grupo_plantillas g WHERE p.id = g.id_template AND g.id_group = " + id_group, { type: sequelize.sequelize.QueryTypes.SELECT })
        .then(templates => {
            res.status(200).send({ templates });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al buscar la lista de grupos." });
        });
}

function updateOne(req, res) {
    grupos.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(plantil => {
            grupos.update({
                    id: req.body.id,
                    name: req.body.name,
                    createdAt: req.body.createdAt,
                    updatedAt: req.body.updatedAt
                }, { returning: true, where: { id: req.body.id } })
                .then(result => {
                    res.status(200).send({ message: "La version del grupo se ha actualizado correctamente" });
                })
                .catch(err => {
                    res.status(500).send({ message: "Ocurrio un error al actualizar el grupo" });
                })
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al buscar el grupo para actualizarlo" });
        })
}

function deleteOne(req, res) {
    var grupo = req.params.id;

    grupos.destroy({
            where: {
                id: grupo
            }
        })
        .then(grupos => {
            res.status(200).send({ message: "grupos eliminada correctamente" });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al eliminar el grupo" });
        })
}

module.exports = {
    create,
    getAll,
    getOne,
    updateOne,
    deleteOne,
    getTemplates,
    createR
}