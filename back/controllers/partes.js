const partes = require('../models').partes;
const firma = require('../models').firma;
const partes_empleados = require('../models').partes_empleados;
const sequelize = require('../models');
const jwt = require('../services/jwt');
var fs = require('fs');
var path = require('path');

function create(req, res) {

    console.log(req.body);

    partes.create(req.body.parte)
        .then(partes => {

            var usuarios = req.body.usuarios;
            var aux = {};
            var error = false;

            for (var i = 0; i < usuarios.length; i++) {

                aux.id_parte = partes.id;
                aux.id_empleado = usuarios[i];
                aux.fecha_vencimiento = req.body.parte.fecha_vencimiento;
                aux.jefe_mando = req.body.parte.jefe_mando;

                partes_empleados.create(aux)
                    .then(parte_emp => {
                        console.log("Parte asignado");
                    })
                    .catch(err => {
                        res.status(500).send({ err });
                        error = true;
                    });
            }

            if (!error)
                res.status(200).send({ partes });
        })
        .catch(err => {
            res.status(500).send({ err });
        });

}

function getAll(req, res) {
    var empresa = req.params.id;

    //sequelize.sequelize.query("SELECT pe.id, e.email, p.nombre_obra, pe.fecha_inicio, pe.fecha_fin, pe.localizacion_inicio, pe.localizacion_fin FROM partes_empleados pe, empleados e, partes p WHERE pe.id_parte = p.id AND pe.id_empleado = e.id ORDER BY pe.id DESC;", { type: sequelize.sequelize.QueryTypes.SELECT})
    sequelize.sequelize.query("SELECT a.*, g.NAME FROM (SELECT a.id, a.VERSION, a.nombre_obra, a.nombre_plantilla, a.firstname, a.fecha_inicio, a.fecha_fin, a.fecha_vencimiento, a.localizacion_inicio, a.localizacion_fin, a.jefe_mando, gp.id_group FROM (SELECT pe.id, pl.VERSION, p.nombre_obra, pl.NAME AS nombre_plantilla, e.firstname, pe.fecha_inicio, pe.fecha_confirmacion AS fecha_fin, pe.fecha_vencimiento, pe.localizacion_inicio, pe.localizacion_fin, pe.jefe_mando, pl.id_template FROM partes_empleados pe, partes p, plantillas pl, empleados e, empresas emp WHERE pe.id_parte = p.id AND p.id_plantilla = pl.id AND pe.id_empleado = e.id AND emp.id = pl.id_empresa AND emp.id = " + empresa + ") AS a LEFT JOIN grupo_plantillas gp ON a.id_template = gp.id_template) AS a LEFT JOIN grupos g ON a.id_group = g.id GROUP BY a.id DESC;", { type: sequelize.sequelize.QueryTypes.SELECT })
        .then(partes => {
            res.status(200).send({ partes });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al buscar los partes." });
        });
}

/*
function getAllInit(req, res) {
    var empresa = req.params.id;
    var empleado = req.params.id_empleado;

    //sequelize.sequelize.query("SELECT pe.id, e.email, p.nombre_obra, pe.fecha_inicio, pe.fecha_fin, pe.localizacion_inicio, pe.localizacion_fin FROM partes_empleados pe, empleados e, partes p WHERE pe.id_parte = p.id AND pe.id_empleado = e.id ORDER BY pe.id DESC;", { type: sequelize.sequelize.QueryTypes.SELECT})
    sequelize.sequelize.query("SELECT a.*, g.NAME FROM (SELECT a.id, a.VERSION, a.nombre_obra, a.nombre_plantilla, a.email, a.fecha_inicio, a.fecha_fin, a.localizacion_inicio, a.localizacion_fin, gp.id_group FROM (SELECT pe.id, pl.VERSION, p.nombre_obra, pl.NAME AS nombre_plantilla, e.email, pe.fecha_inicio, pe.fecha_confirmacion AS fecha_fin, pe.localizacion_inicio, pe.localizacion_fin, pl.id_template FROM partes_empleados pe, partes p, plantillas pl, empleados e, empresas emp WHERE pe.fecha_inicio IS NOT NULL AND pe.id_empleado=" + empleado + " AND pe.id_parte = p.id AND p.id_plantilla = pl.id AND pe.id_empleado = e.id AND emp.id = pl.id_empresa AND emp.id = " + empresa + ") AS a LEFT JOIN grupo_plantillas gp ON a.id_template = gp.id_template) AS a LEFT JOIN grupos g ON a.id_group = g.id;", { type: sequelize.sequelize.QueryTypes.SELECT })
        .then(partes => {
            res.status(200).send({ partes });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al buscar los partes." });
        });
}
*/

function getAllInit(req, res) {
    var empresa = req.params.id;
    var empleado = req.params.id_empleado;

    var sql = "SELECT a.*, g.NAME FROM (SELECT a.id, a.VERSION, a.nombre_obra, a.nombre_plantilla, a.email, a.fecha_inicio, a.fecha_fin, a.localizacion_inicio, a.localizacion_fin, gp.id_group FROM (SELECT pe.id, pl.VERSION, p.nombre_obra, pl.NAME AS nombre_plantilla, e.email, pe.fecha_inicio, pe.fecha_confirmacion AS fecha_fin, pe.localizacion_inicio, pe.localizacion_fin, pl.id_template FROM partes_empleados pe, partes p, plantillas pl, empleados e, empresas emp WHERE pe.fecha_inicio IS NOT NULL AND pe.fecha_confirmacion IS NULL AND pe.id_empleado=" + empleado + " AND pe.id_parte = p.id AND p.id_plantilla = pl.id AND pe.id_empleado = e.id AND emp.id = pl.id_empresa AND emp.id = " + empresa + ") AS a LEFT JOIN grupo_plantillas gp ON a.id_template = gp.id_template) AS a LEFT JOIN grupos g ON a.id_group = g.id;";
    console.log("\nGETALLINIT\n");
    console.log("\n");
    console.log(sql);
    console.log("\n");
    console.log("\n");
    //sequelize.sequelize.query("SELECT pe.id, e.email, p.nombre_obra, pe.fecha_inicio, pe.fecha_fin, pe.localizacion_inicio, pe.localizacion_fin FROM partes_empleados pe, empleados e, partes p WHERE pe.id_parte = p.id AND pe.id_empleado = e.id ORDER BY pe.id DESC;", { type: sequelize.sequelize.QueryTypes.SELECT})
    sequelize.sequelize.query(sql, { type: sequelize.sequelize.QueryTypes.SELECT })
        .then(partes => {
            res.status(200).send({ partes });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al buscar los partes." });
        });
}

function getAllFinish(req, res) {
    var empresa = req.params.id;
    var empleado = req.params.id_empleado;

    var sql = "SELECT a.*, g.NAME FROM (SELECT a.id, a.VERSION, a.nombre_obra, a.nombre_plantilla, a.email, a.fecha_inicio, a.fecha_fin, a.localizacion_inicio, a.localizacion_fin, gp.id_group FROM (SELECT pe.id, pl.VERSION, p.nombre_obra, pl.NAME AS nombre_plantilla, e.email, pe.fecha_inicio, pe.fecha_confirmacion AS fecha_fin, pe.localizacion_inicio, pe.localizacion_fin, pl.id_template FROM partes_empleados pe, partes p, plantillas pl, empleados e, empresas emp WHERE pe.fecha_inicio IS NOT NULL AND pe.fecha_confirmacion IS NOT NULL AND pe.id_empleado=" + empleado + " AND pe.id_parte = p.id AND p.id_plantilla = pl.id AND pe.id_empleado = e.id AND emp.id = pl.id_empresa AND emp.id = " + empresa + ") AS a LEFT JOIN grupo_plantillas gp ON a.id_template = gp.id_template) AS a LEFT JOIN grupos g ON a.id_group = g.id;";

    console.log("\nGETALLFINISH\n");
    console.log("\n");
    console.log(sql);
    console.log("\n");
    console.log("\n");

    //sequelize.sequelize.query("SELECT pe.id, e.email, p.nombre_obra, pe.fecha_inicio, pe.fecha_fin, pe.localizacion_inicio, pe.localizacion_fin FROM partes_empleados pe, empleados e, partes p WHERE pe.id_parte = p.id AND pe.id_empleado = e.id ORDER BY pe.id DESC;", { type: sequelize.sequelize.QueryTypes.SELECT})
    sequelize.sequelize.query(sql, { type: sequelize.sequelize.QueryTypes.SELECT })
        .then(partes => {
            res.status(200).send({ partes });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al buscar los partes." });
        });
}

function getAllNoInit(req, res) {
    var empresa = req.params.id;
    var empleado = req.params.id_empleado;

    //sequelize.sequelize.query("SELECT pe.id, e.email, p.nombre_obra, pe.fecha_inicio, pe.fecha_fin, pe.localizacion_inicio, pe.localizacion_fin FROM partes_empleados pe, empleados e, partes p WHERE pe.id_parte = p.id AND pe.id_empleado = e.id ORDER BY pe.id DESC;", { type: sequelize.sequelize.QueryTypes.SELECT})
    sequelize.sequelize.query("SELECT a.*, g.NAME FROM (SELECT a.id, a.VERSION, a.nombre_obra, a.nombre_plantilla, a.email, a.fecha_inicio, a.fecha_fin, a.localizacion_inicio, a.localizacion_fin, gp.id_group FROM (SELECT pe.id, pl.VERSION, p.nombre_obra, pl.NAME AS nombre_plantilla, e.email, pe.fecha_inicio, pe.fecha_confirmacion AS fecha_fin, pe.localizacion_inicio, pe.localizacion_fin, pl.id_template FROM partes_empleados pe, partes p, plantillas pl, empleados e, empresas emp WHERE pe.fecha_inicio IS NULL AND pe.id_empleado=" + empleado + " AND pe.id_parte = p.id AND p.id_plantilla = pl.id AND pe.id_empleado = e.id AND emp.id = pl.id_empresa AND emp.id = " + empresa + ") AS a LEFT JOIN grupo_plantillas gp ON a.id_template = gp.id_template) AS a LEFT JOIN grupos g ON a.id_group = g.id;", { type: sequelize.sequelize.QueryTypes.SELECT })
        .then(partes => {
            res.status(200).send({ partes });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al buscar los partes." });
        });
}

function iniciarParte(req, res) {
    sequelize.sequelize.query("UPDATE partes_empleados SET usuario_inicio='" + req.body.usuario_inicio + "', fecha_inicio=NOW() WHERE id = " + req.body.id + ";")
        .then(data => {
            res.status(200).send({ data });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al actualizar el parte." });
        });
}

function confirmarParte(req, res) {
    sequelize.sequelize.query("UPDATE partes_empleados SET usuario_confirmacion='" + req.body.usuario_inicio + "', fecha_confirmacion=NOW() WHERE id = " + req.body.id + ";")
        .then(data => {
            res.status(200).send({ data });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al actualizar el parte." });
        });
}

function editarParte(req, res) {
    sequelize.sequelize.query("UPDATE partes_empleados SET ultimo_usuario='" + req.body.ultimo_usuario + "', ultimo_guardado=NOW() WHERE id = " + req.body.id + ";")
        .then(data => {
            res.status(200).send({ data });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al actualizar el parte." });
        });
}

function getOne(req, res) {
    var id = req.params.id;

    sequelize.sequelize.query("SELECT p.nombre_obra, pl.NAME AS nombre_plantilla, g.NAME AS nombre_grupo, pe.* FROM partes_empleados pe, partes p, plantillas pl, grupos g, grupo_plantillas gp WHERE p.id_plantilla = pl.id AND g.id = gp.id_group AND gp.id_template = pl.id_template AND pe.id=" + id + ";", { type: sequelize.sequelize.QueryTypes.SELECT })
        .then(parte => {
            res.status(200).send({ parte: parte[0] });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al buscar los partes." });
        });

    /* partes_empleados.findOne({
             where: {
                 id: id
             }
         })
         .then(parte => {
             res.status(200).send({ parte });
         })
         .catch(err => {
             res.status(500).send({ message: "Ocurrio un error al buscar el parte" });
         }); */
}

function deleteOne(req, res) {
    var empleado = req.params.id;

    partes_empleados.destroy({
            where: {
                id: empleado
            }
        })
        .then(empleados => {
            res.status(200).send({ message: "Parte eliminado correctamente" });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al eliminar el parte" });
        });
}

function getOneofT(req, res) {
    var id = req.params.id;

    sequelize.sequelize.query("SELECT p.name, p.template, p.header, p.footer FROM plantillas p, partes pa WHERE p.id = pa.id_plantilla AND pa.id = " + id + ";", { type: sequelize.sequelize.QueryTypes.SELECT })
        .then(plantilla => {
            res.status(200).send({ plantilla });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al localizar la plantilla asociada al parte." });
        });
}

function uploadFile(req, res) {
    var Id = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {

        var file_path = req.files.image.path;
        //var file_split = file_path.split('\\');
        //file_name = file_split[3];
        file_name = path.parse(file_path).base;
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        res.status(200).send({ file: file_name });

    } else {
        res.status(200).send({ message: 'No has subido ningun archivo...' });
    }
}

function createFirma(req, res) {

    var firma_object = {
        data: req.body.json
    };

    firma.create(firma_object)
        .then(firma => {
            res.status(200).send({ firma });
        })
        .catch(err => {
            res.status(500).send({ err });
        });
}

function createRelleno(req, res) {
    sequelize.sequelize.query("UPDATE partes_empleados SET fecha_inicio = '" + req.body.fecha_inicio + "', localizacion_inicio = '" + req.body.localizacion_inicio + "', localizacion_fin = '" + req.body.localizacion_fin + "', parte_relleno = '" + req.body.parte_relleno + "' WHERE id = " + req.body.id + ";")
        .then(data => {
            res.status(200).send({ data });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al actualizar el parte." });
        });
}

function getParteRelleno(req, res) {
    var id = req.params.id;
    var id_empleado = req.params.id_empleado;

    sequelize.sequelize.query("SELECT p.NAME, pe.parte_relleno AS template, p.header, p.footer FROM plantillas p, partes pa, partes_empleados pe WHERE p.id = pa.id_plantilla AND pe.id_parte = pa.id AND pe.id = " + id + ";", { type: sequelize.sequelize.QueryTypes.SELECT })
        .then(plantilla => {
            res.status(200).send({ plantilla });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al localizar la plantilla asociada al parte." });
        });
}

function getFile(req, res) {
    var file = req.params.file;
    var path_file = './server/uploads/partes/' + file;

    fs.exists(path_file, function(exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({ message: 'No existe el archivo...' });
        }
    });
}

function getFirma(req, res) {
    var id = req.params.id;

    sequelize.sequelize.query("SELECT data AS firma FROM firmas WHERE id = " + id + ";", { type: sequelize.sequelize.QueryTypes.SELECT })
        .then(data => {
            res.status(200).send({ firma: data });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al localizar la firma asociada al parte." });
        });
}


module.exports = {
    create,
    getAll,
    getAllInit,
    getAllFinish,
    getAllNoInit,
    getOne,
    getOneofT,
    uploadFile,
    createFirma,
    createRelleno,
    getParteRelleno,
    getFile,
    getFirma,
    deleteOne,
    iniciarParte,
    editarParte,
    confirmarParte
}