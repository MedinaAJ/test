var empresaController = require('../controllers').empresa;
var authenticated = require('../authenticated/authenticated');

var multipart = require('connect-multiparty');
var path = require('path');
var md_upload = multipart({ uploadDir: './server/uploads/empresas' });

module.exports = function(app) {

    app.post('/api/crear_empresa', authenticated.auth, empresaController.create);
    app.get('/api/listar_empresas', authenticated.auth, empresaController.getAll);
    app.get('/api/obtener_empresa/:id', authenticated.auth, empresaController.getOne);
    app.put('/api/editar_empresa/', authenticated.auth, empresaController.updateOne);
    app.delete('/api/eliminar_empresa/:id', authenticated.auth, empresaController.deleteOne);
    app.get('/api/obtener_empleados_por_empresa/:id', authenticated.auth, empresaController.getAllofEnterprise);
    app.get('/api/todos_empleados_de_empresa/:id', authenticated.auth, empresaController.getUsersofEnterprise);

    app.post('/api/upload-empresa-logo-banner', [authenticated.auth, md_upload], empresaController.uploadBanner);
    app.post('/api/upload-empresa-logo-small', [authenticated.auth, md_upload], empresaController.uploadSmall);
    app.get('/api/get-image-empresa/:imageFile', empresaController.getImage);

};