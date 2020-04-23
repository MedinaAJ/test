const plantillas = require('../models').plantillas;
const jwt = require('../services/jwt');
var fs = require('fs');
var path = require('path');
const sequelize = require('../models');

function create(req, res) {
    plantillas.create(req.body)
        .then(plantillas => {
            res.status(200).send({ plantillas });
        })
        .catch(err => {
            res.status(500).send({ err });
        });
}

/*function getAll(req, res) {
    var id = req.params.id;

    plantillas.findAll({
        where: {
            id_empresa: id
        }
    })
        .then(plantillas => {
            res.status(200).send({ plantillas });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al buscar la lista de plantillas." });
        });
}*/

function getAll(req, res) {
    var id = req.params.id;

    sequelize.sequelize.query(
        "SELECT p.*, g.name AS nameg FROM plantillas p, grupos g where p.id_empresa = " + id + " and p.id_group = g.id ;", { type: sequelize.sequelize.QueryTypes.SELECT}
    )
    .then(plantillas => {
        res.status(200).send({ plantillas });
    })
    .catch(err => {
        res.status(500).send({ message: "Ocurrio un error al buscar la lista de plantillas." });
    });
}

function getAllG(req, res) {
    var id = req.params.id;
    var idg = req.params.idg;

    plantillas.findAll({
        where: {
            id_empresa: id,
            id_group: idg
        }
    })
        .then(plantillas => {
            res.status(200).send({ plantillas });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al buscar la lista de plantillas." });
        });
}

function getOne(req, res) {
    var id = req.params.id;

    plantillas.findOne({
            where: {
                id: id
            }
        })
        .then(plantillas => {
            res.status(200).send({ plantillas });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al buscar las plantillas" });
        });
}

function getLast(req, res) {
    var id = req.params.id;

    sequelize.sequelize.query(
                                "SELECT * FROM plantillas p WHERE p.id = "+ id +" AND p.VERSION IN (SELECT MAX(VERSION) FROM plantillas WHERE id = " + id + "); ", { type: sequelize.sequelize.QueryTypes.SELECT})
        .then(templates => {
            res.status(200).send({ templates });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al buscar la lista de grupos." });
        });
}

function getLastId(req, res) {
    sequelize.sequelize.query(
        "SELECT MAX(id_template) AS id FROM plantillas;", { type: sequelize.sequelize.QueryTypes.SELECT})
        .then(data => {
             res.status(200).send({ id: data });
        })
        .catch(err => {
             res.status(500).send({ message: "Ocurrio un error al buscar el ultimo id de la plantilla." });
        });
}

function updateOne(req, res) {
    plantillas.findOne({
            where: {
                id: req.body.id,
                version: req.body.version
            }
        })
        .then(plantil => {
            plantillas.update({
                    id: req.body.id,
                    version: req.body.version,
                    id_group: req.body.id_group,
                    name: req.body.name,
                    template: req.body.template,
                    createdAt: req.body.createdAt,
                    updatedAt: req.body.updatedAt
                }, { returning: true, where: { id: req.body.id, version: req.body.version } })
                .then(result => {
                    res.status(200).send({ message: "La version de la plantilla se ha actualizado correctamente" });
                })
                .catch(err => {
                    res.status(500).send({ message: "Ocurrio un error al actualizar la plantilla" });
                });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al buscar la plantilla para actualizarlo" });
        });
}

function deleteOne(req, res) {
    var id = req.params.id;
    var version = req.params.version;

    plantillas.destroy({
            where: {
                id_template: id,
                version: version
            }
        })
        .then(plantillas => {
            res.status(200).send({ message: "Plantilla eliminada correctamente" });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al eliminar la plantilla" });
        });
}

function uploadHeader(req, res){
	var Id = req.params.id;
    var file_name = 'No subido...';    
	
	if(req.files){

        var file_path = req.files.image.path;
        //var file_split = file_path.split('\\');
        //file_name = file_split[3];
        file_name = path.parse(file_path).base;
		var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
		
		if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' || file_ext == 'PNG' || file_ext == 'JPG' || file_ext == 'GIF'){

            sequelize.sequelize.query(
                "UPDATE plantillas SET header = '"+ file_name +"' WHERE id = " + Id + "; ")
                .then(templates => {
                     res.status(200).send({ templates, image: file_name });
                })
                .catch(err => {
                     res.status(500).send({ message: "Ocurrio un error al subir el header." });
                });		
		}else{
			res.status(200).send({message: 'Extension del archivo no válida'});
		}
		
	}else{
		res.status(200).send({message: 'No has subido ninguna imagen...'});
	}
}

function uploadFooter(req, res){
	var Id = req.params.id;
    var file_name = 'No subido...';    
	
	if(req.files){

        var file_path = req.files.image.path;
        //var file_split = file_path.split('\\');
        //file_name = file_split[3];
        file_name = path.parse(file_path).base;
		var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
		
		if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' || file_ext == 'PNG' || file_ext == 'JPG' || file_ext == 'GIF'){

            sequelize.sequelize.query(
                "UPDATE plantillas SET footer = '"+ file_name +"' WHERE id = " + Id + "; ")
                .then(templates => {
                     res.status(200).send({ templates, image: file_name });
                })
                .catch(err => {
                     res.status(500).send({ message: "Ocurrio un error al subir el header." });
                });		
		}else{
			res.status(200).send({message: 'Extension del archivo no válida'});
		}
		
	}else{
		res.status(200).send({message: 'No has subido ninguna imagen...'});
	}
}

function getImageFooter(req, res){
	var imageFile = req.params.imageFile;
	var path_file = './server/uploads/templates/'+imageFile;
	
	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe la imagen...'});
		}
	});
}

function getImageHeader(req, res){
	var imageFile = req.params.imageFile;
	var path_file = './server/uploads/templates/'+imageFile;
	
	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe la imagen...'});
		}
	});
}

module.exports = {
    create,
    getAll,
    getOne,
    getLast,
    updateOne,
    deleteOne,
    uploadHeader,
    uploadFooter,
    getImageHeader,
    getImageFooter,
    getLastId,
    getAllG
}
