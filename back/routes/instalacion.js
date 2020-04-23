var instalacionController = require('../controllers').instalacion;
var authenticated = require('../authenticated/authenticated');

var multipart = require('connect-multiparty');
var path = require('path');
var md_upload = multipart({ uploadDir: './server/uploads/instalaciones' });

module.exports = function(app) {

    app.post('/api/crear_instalacion', authenticated.auth, instalacionController.create);
    app.get('/api/lista_todas_instalaciones', authenticated.auth, instalacionController.getAll);
    app.get('/api/obtener_instalacion/:id', authenticated.auth, instalacionController.getOne);
    app.get('/api/obtener_instalacion_id_panel/:id', authenticated.auth, instalacionController.getOnePanel);
    app.put('/api/editar_instalacion/', authenticated.auth, instalacionController.updateOne);
    app.delete('/api/eliminar_instalacion/:id', authenticated.auth, instalacionController.deleteOne);
    app.get('/api/obtener_panel/:id', authenticated.auth, instalacionController.getPanel);
    app.put('/api/editar_panel/', authenticated.auth, instalacionController.updatePanel);
    /*app.get('/api/obtener_empleados_por_empresa/:id', authenticated.auth, empresaController.getAllofEnterprise);
    app.get('/api/todos_empleados_de_empresa/:id', authenticated.auth, empresaController.getUsersofEnterprise);

    app.post('/api/upload-instalacion-file', [authenticated.auth, md_upload], empresaController.uploadBanner);
    app.get('/api/get-image-instalacion/:imageFile', empresaController.getImage);*/

};