const sequelize = require('../models');
const jwt = require('../services/jwt');


function obtenerEmpresadeEmpleado(req, res) {
    var id_empleado = req.params.id;

    sequelize.sequelize.query(
                                "SELECT e.* FROM empresas e, empresa_empleado ee, empleados em WHERE e.id = ee.id_empresa AND ee.id_empleado = em.id AND em.id = "+id_empleado+";", { type: sequelize.sequelize.QueryTypes.SELECT}
                            )
        .then(data => {
            res.status(200).send({ data });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al buscar la lista de grupos." });
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
    obtenerEmpresadeEmpleado,
    uploadBanner,
    uploadSmall,
    getImage
}