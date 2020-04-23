const empleados = require('../models').empleados;
const jwt = require('../services/jwt');
var fs = require('fs');
var path = require('path');
const sequelize = require('../models');

function create(req, res) {
    empleados.create(req.body)
        .then(empleados => {
            res.status(200).send({ empleados });
        })
        .catch(err => {
            res.status(500).send({ err });
        });
}

function inicio_sesion(req, res) {
    empleados.findOne({
            where: {
                email: req.body.email,
                passwd: req.body.passwd
            }
        })
        .then(empleados => {
            if (empleados) {
                if(empleados.active == 1){
                    if (req.body.token) {
                        res.status(200).send({
                            token: jwt.createToken(empleados)
                        });
                    } else {
                        res.status(200).send({
                            empleados: empleados,
                            token: jwt.createToken(empleados)
                        });
                    }
                }else{
                    res.status(401).send({ message: 'Acceso no autorizado' });
                }                
            } else {
                res.status(401).send({ message: 'Acceso no autorizado' });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al buscar el usuario" });
        });
}

function getAll(req, res) {
    empleados.findAll()
        .then(empleados => {
            res.status(200).send({ empleados });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al buscar la lista de usuarios." });
        });
}

function getAllEnterprise(req, res) {
    var empresa = req.params.empresa;
   
    sequelize.sequelize.query("SELECT e.`id`, e.`id_profile`, e.`phone`, e.`lastname`, e.`firstname`, e.`email`, e.`passwd`, e.`last_passwd_gen`, e.`active`, e.`last_connection_date`, e.`createdAt`, e.`updatedAt`, e.`field1`, e.`field2`, e.`super` FROM `empleados` e, `empresa_empleado` ee, `empresas` em WHERE e.id = ee.id_empleado AND em.id = ee.id_empresa AND em.name = '" + empresa + "';", { type: sequelize.sequelize.QueryTypes.SELECT})
        .then(data => {
            res.status(200).send({ data });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al buscar la lista de usuarios." });
        });
}

function getEmpleadosAsignados(req, res) {
    var id = req.params.id;
    var perfil = req.params.perfil;
    
    var sql =  "SELECT e.email FROM empleados e, jefe_operario jo WHERE e.id = jo.id_operario AND jo.id_jefe = "+id+";";

    if(perfil == 3)
        sql =  "SELECT e.email FROM empleados e, jefe_operario jo WHERE e.id = jo.id_jefe AND jo.id_operario = "+id+";";

    sequelize.sequelize.query(sql, { type: sequelize.sequelize.QueryTypes.SELECT})
        .then(data => {
            res.status(200).send({ data });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al buscar la lista de usuarios." });
        });

}

function getOne(req, res){
    var empleado = req.params.id;

    empleados.findOne({
		where:{
			id: empleado
		}
	})
	.then(empleados => {
		res.status(200).send({ empleados });
	})
	.catch(err => {
		res.status(500).send({message:"Ocurrio un error al buscar el empleado"});
	});
}

function getEmpresa(req, res) {

    var id = req.params.id;

    sequelize.sequelize.query("SELECT e.id, e.name FROM empresas e, empresa_empleado ee WHERE ee.id_empresa = e.id AND ee.id_empleado = " + id + ";", { type: sequelize.sequelize.QueryTypes.SELECT})
        .then(data => {
            res.status(200).send({ data });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al buscar la empresa del usuario." });
        });
}

function createEmpresaEmpleado(req, res){
    var empresa = req.body.empresa;
    var empleado = req.body.empleado;

    sequelize.sequelize.query("INSERT INTO empresa_empleado VALUES (" + empresa + ", " + empleado + ") ;")
        .then(data => {
            res.status(200).send({ data });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al asignar empresa con empleado." });
    });
}

function createOperarioJefe(req, res) {
    var id_empleado = req.body.id_empleado;
    var id_jefe = req.body.id_jefe;

    sequelize.sequelize.query("INSERT INTO jefe_operario VALUES (" + id_jefe + ", " + id_empleado + ") ;")
        .then(data => {
            res.status(200).send({ data });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al asignar jefe con operario." });
    });
}

function updateOne(req, res){
    empleados.findOne({
		where:{
			id: req.body.id
		}
	})
	.then(emplead => {
		empleados.update(
            { id_profile: req.body.id_profile ,
            phone: req.body.phone ,
            lastname: req.body.lastname ,
            firstname: req.body.firstname ,
            email: req.body.email ,
            passwd: req.body.passwd ,
            last_passwd_gen: req.body.last_passwd_gen ,
            active: req.body.active ,
            last_connection_date: req.body.last_connection_date ,
            createdAt: req.body.createdAt ,
            updatedAt: req.body.updatedAt ,
            field1: req.body.field1 ,
            field2: req.body.field2,
            super: req.body.super },
           {returning: true, where: {id: req.body.id} }
        )
        .then(result => {
            res.status(200).send({message:"El empleado se ha actualizado correctamente"});
        })
        .catch(err => {
            res.status(500).send({message:"Ocurrio un error al actualizar el empleado"});
        });
	})
	.catch(err => {
		res.status(500).send({message:"Ocurrio un error al buscar el empleado para actualizarlo"});
	});
}

function deleteOne(req, res){
    var empleado = req.params.id;

    empleados.destroy({
		where:{
			id: empleado
		}
	})
	.then(empleados => {
		res.status(200).send({message: "Empleado eliminado correctamente"});
	})
	.catch(err => {
		res.status(500).send({message:"Ocurrio un error al eliminar el empleado"});
	});
}

function eliminarEmpleados(req, res){
    var id = req.params.id;

    sequelize.sequelize.query("DELETE FROM jefe_operario WHERE id_jefe = "+id+" ;")
        .then(data => {
            res.status(200).send({ message: 'Eliminados con exito' });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al desasignar jefe con operario." });
        });
}

function eliminarJefes(req, res){
    var id = req.params.id;

    sequelize.sequelize.query("DELETE FROM jefe_operario WHERE id_operario = "+id+" ;")
        .then(data => {
            res.status(200).send({ message: 'Eliminados con exito' });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al desasignar jefe con operario." });
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
	var path_file = './server/uploads/empleados/'+imageFile;
	
	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe la imagen...'});
		}
	});
}

module.exports = {
    inicio_sesion,
    create,
    getAll,
    getOne,
    updateOne,
    deleteOne,
    uploadSmall,
    uploadBanner,
    getImage,
    getAllEnterprise,
    createEmpresaEmpleado,
    createOperarioJefe,
    getEmpresa,
    getEmpleadosAsignados,
    eliminarEmpleados,
    eliminarJefes
}