var empresa = require('../models').empresa;
var jwt = require('../services/jwt');
var fs = require('fs');
var path = require('path');
const sequelize = require('../models');

function create(req, res) {

    var empresa = req.body;
    sequelize.sequelize.query("SELECT MAX(id) AS ultimo FROM empresas;", { type: sequelize.sequelize.QueryTypes.SELECT})
    // sequelize.sequelize.query("SELECT e.id, IF(e.id_profile = 2, 'Jefe', 'Operador') AS id_profile, e.lastname, e.firstname, e.email, e.active, e.last_connection_date, e.phone, e.super FROM empleados e, empresa_empleado ee WHERE e.id = ee.id_empleado AND ee.id_empresa = " + id + ";", { type: sequelize.sequelize.QueryTypes.SELECT})
        .then(data => {
            console.log(req.body);
            console.log("-------");
            console.log(data[0].ultimo + 1);
            empresa.id = data[0].ultimo + 1;

            console.log(empresa);
            sequelize.sequelize.query("INSERT INTO empresas (id, name, logo_small, logo_banner, color_back, color_active, responsable, phone) VALUES"+
            " ("+empresa.id+", '"+empresa.name+"', '"+empresa.logo_small+"', '"+empresa.logo_banner+"', '"+empresa.color_back+"', '"+empresa.color_active+"', '"+empresa.responsable+"', '"+empresa.phone+"') ;")
            .then(() => {
                res.status(200).send({ message: 'Empresa creada correctamente' });
            })            
            .catch( err => {
                res.status(500).send({ err });
            });
            
        })
        .catch(err => {
            res.status(500).send({ err });
        });
}

function getAll(req, res) {
    empresa.findAll()
        .then(empresa => {
            res.status(200).send({ empresa });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al buscar la lista de empresas." });
        });
}

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

function getOne(req, res){
    var id = req.params.id;

    empresa.findOne({
		where:{
			id: id
		}
	})
	.then(empresa => {
		res.status(200).send({ empresa });
	})
	.catch(err => {
		res.status(500).send({message:"Ocurrio un error al buscar la empresa"});
	})
}

function updateOne(req, res){

    empresa.findOne({
		where:{
			id: req.body.id
		}
	})
	.then(empres => {

		empresa.update(
            { 
            name: req.body.name ,
            logo_small: req.body.logo_small ,
            logo_banner: req.body.logo_banner,
            color_back: req.body.color_back,
            color_active: req.body.color_active,
            responsable: req.body.responsable,
            phone: req.body.phone ,
            createdAt: req.body.createdAt ,
            updatedAt: req.body.updatedAt , },
           {returning: true, where: {id: req.body.id} }
        )
        .then(result => {
            res.status(200).send({message:"la empresa se ha actualizado correctamente"});
        })
        .catch(err => {
            res.status(500).send({message:"Ocurrio un error al actualizar la empresa"});
        })
	})
	.catch(err => {
		res.status(500).send({message:"Ocurrio un error al buscar el empleado para actualizarlo"});
	})
}

function deleteOne(req, res){
    var empresa = req.params.id;

    empresa.destroy({
		where:{
			id: empresa
		}
	})
	.then(empresa => {
		res.status(200).send({message: "Empresa eliminada correctamente"});
	})
	.catch(err => {
		res.status(500).send({message:"Ocurrio un error al eliminar la empresa"});
	})
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

module.exports = {
    create,
    getAll,
    getOne,
    updateOne,
    deleteOne,
    uploadSmall,
    uploadBanner,
    getImage,
    getAllofEnterprise,
    getUsersofEnterprise
}