var instalacione = require('../models').instalacione;
var panel = require('../models').panel;
var jwt = require('../services/jwt');
var fs = require('fs');
var path = require('path');
const sequelize = require('../models');

function create(req, res) {

    var panel_init = {};
    panel_init.content = "";

    panel.create(panel_init)
    .then(panel => {

        req.body.id_panel = panel.dataValues.id;

        instalacione.create(req.body)
            .then(instalacione => {
                res.status(200).send({ instalacione });
            })
            .catch(err => {
                res.status(500).send({ err });
            });

    })
    .catch(err => {
        res.status(500).send({ err });
    });
}

function getAll(req, res) {
    instalacione.findAll()
        .then(instalacione => {
            res.status(200).send({ instalacione });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al buscar la lista de instalaciones." });
        });
}

function getOne(req, res){
    var id = req.params.id;

    instalacione.findOne({
		where:{
			id: id
		}
	})
	.then(instalacione => {
		res.status(200).send({ instalacione });
	})
	.catch(err => {
		res.status(500).send({message:"Ocurrio un error al buscar la instalacion"});
	})
}

function getOnePanel(req, res){
    var id = req.params.id;

    instalacione.findOne({
		where:{
			id_panel: id
		}
	})
	.then(instalacione => {
		res.status(200).send({ instalacione });
	})
	.catch(err => {
		res.status(500).send({message:"Ocurrio un error al buscar la instalacion"});
	})
}

function updateOne(req, res){

    instalacione.findOne({
		where:{
			id: req.body.id
		}
	})
	.then(instalaci => {

		instalacione.update(
            { 
            name: req.body.name ,
            localidad: req.body.localidad ,
            provincia: req.body.provincia,
            id_empresa: req.body.id_empresa,
            createdAt: req.body.createdAt ,
            updatedAt: req.body.updatedAt , },
           {returning: true, where: {id: req.body.id} }
        )
        .then(result => {
            res.status(200).send({message:"la instalacion se ha actualizado correctamente"});
        })
        .catch(err => {
            res.status(500).send({message:"Ocurrio un error al actualizar la instalacion"});
        })
	})
	.catch(err => {
		res.status(500).send({message:"Ocurrio un error al buscar la instalacion para actualizarla"});
	})
}

function deleteOne(req, res){
    var instalaciones = req.params.id;

    instalacione.destroy({
		where:{
			id: instalaciones
		}
	})
	.then(instalacione => {
		res.status(200).send({message: "La instalacion ha sido eliminada correctamente"});
	})
	.catch(err => {
		res.status(500).send({message:"Ocurrio un error al eliminar la instalacion"});
	})
}

/*
    Operaciones con paneles a partir de editar panel
*/

function getPanel(req, res){
    var id = req.params.id;

    panel.findOne({
		where:{
			id: id
		}
	})
	.then(panel => {
		res.status(200).send({ panel });
	})
	.catch(err => {
		res.status(500).send({message:"Ocurrio un error al buscar el panel"});
	})
}

function updatePanel(req, res){

    panel.findOne({
		where:{
			id: req.body.id
		}
	})
	.then(pan => {

		panel.update(
            { 
                content: req.body.content ,
            },
           {returning: true, where: {id: req.body.id} }
        )
        .then(result => {
            res.status(200).send({message:"El panel se ha actualizado correctamente"});
        })
        .catch(err => {
            res.status(500).send({message:"Ocurrio un error al actualizar el panel"});
        })
	})
	.catch(err => {
		res.status(500).send({message:"Ocurrio un error al buscar el panel para actualizarlo"});
	})
}

/*
function getAllofEnterprise(req, res){
    var id = req.params.id;

    sequelize.sequelize.query("(SELECT IF(e.id_profile = 2, 'Jefe', 'Operador') AS iprofile, e.*, COUNT(*) AS n_jefes FROM empleados e, jefe_operario jo, empresa_empleado ee WHERE e.id=jo.id_operario AND e.id=ee.id_empleado AND id_empresa=" + id + " GROUP BY e.firstname, e.lastname) UNION ALL (SELECT IF(e.id_profile = 2, 'Jefe', 'Operador') AS iprofile, e.*, COUNT(*) AS n_empleados FROM empleados e, jefe_operario jo, empresa_empleado ee WHERE e.id=jo.id_jefe AND e.id=ee.id_empleado AND id_empresa=" + id + " GROUP BY e.firstname, e.lastname);", { type: sequelize.sequelize.QueryTypes.SELECT})
    // sequelize.sequelize.query("SELECT e.id, IF(e.id_profile = 2, 'Jefe', 'Operador') AS id_profile, e.lastname, e.firstname, e.email, e.active, e.last_connection_date, e.phone, e.super FROM empleados e, empresa_empleado ee WHERE e.id = ee.id_empleado AND ee.id_empresa = " + id + ";", { type: sequelize.sequelize.QueryTypes.SELECT})
        .then(data => {
            res.status(200).send({ data });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al buscar los usuarios de la empresa." });
        });

}

function getUsersofEnterprise(req, res){
    var id = req.params.id;

    sequelize.sequelize.query("SELECT e.id, e.firstname, e.email, e.phone FROM empleados e, empresa_empleado ee WHERE e.id = ee.id_empleado AND ee.id_empresa = " + id + ";", { type: sequelize.sequelize.QueryTypes.SELECT})
    // sequelize.sequelize.query("SELECT e.id, IF(e.id_profile = 2, 'Jefe', 'Operador') AS id_profile, e.lastname, e.firstname, e.email, e.active, e.last_connection_date, e.phone, e.super FROM empleados e, empresa_empleado ee WHERE e.id = ee.id_empleado AND ee.id_empresa = " + id + ";", { type: sequelize.sequelize.QueryTypes.SELECT})
        .then(data => {
            res.status(200).send({ data });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al buscar los usuarios de la empresa." });
        });

}

function uploadBanner(req, res){
    var file_name = 'No subido...';    
	
	if(req.files){

        var file_path = req.files.image.path;
        //var file_split = file_path.split('\\');
        //file_name = file_split[3];
        file_name = path.parse(file_path).base;
		var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        res.status(200).send({file: file_name});
		
	}else{
		res.status(200).send({message: 'No has subido ningun archivo...'});
	}
}

function uploadSmall(req, res){
    var file_name = 'No subido...';    
	
	if(req.files){

        var file_path = req.files.image.path;
        //var file_split = file_path.split('\\');
        //file_name = file_split[3];
        file_name = path.parse(file_path).base;
		var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        res.status(200).send({file: file_name});
		
	}else{
		res.status(200).send({message: 'No has subido ningun archivo...'});
	}
}

function getImage(req, res){
	var imageFile = req.params.imageFile;
	var path_file = './server/uploads/empresas/'+imageFile;
	
	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe la imagen...'});
		}
	});
}
*/
module.exports = {
    create,
    getAll,
    getOne,
    getOnePanel,
    updateOne,
    deleteOne,
    getPanel,
    updatePanel
   /* uploadSmall,
    uploadBanner,
    getImage,
    getAllofEnterprise,
    getUsersofEnterprise*/
}