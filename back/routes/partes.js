const partesController = require('../controllers').partes;
const authenticated = require('../authenticated/authenticated');

var multipart = require('connect-multiparty');
const path = require('path');
var md_upload = multipart({ uploadDir: './server/uploads/partes' });

module.exports = (app) => {
    app.post('/api/crear_parte', authenticated.auth, partesController.create);
    app.delete('/api/eliminar_parte/:id', authenticated.auth, partesController.deleteOne);
    app.get('/api/listar_partes/:id', authenticated.auth, partesController.getAll);
    app.get('/api/obtener_lista_partes_iniciados/:id/:id_empleado', authenticated.auth, partesController.getAllInit);
    app.get('/api/obtener_lista_partes_no_iniciados/:id/:id_empleado', authenticated.auth, partesController.getAllNoInit);
    app.get('/api/obtener_lista_partes_finalizados/:id/:id_empleado', authenticated.auth, partesController.getAllFinish);
    app.get('/api/obtener_parte/:id', authenticated.auth, partesController.getOne);
    app.get('/api/obtener_plantilla_desde_parte/:id', authenticated.auth, partesController.getOneofT);
    app.post('/api/upload-file', [authenticated.auth, md_upload], partesController.uploadFile);
    app.post('/api/crear-firma', authenticated.auth, partesController.createFirma);
    app.put('/api/crear_parte_relleno', authenticated.auth, partesController.createRelleno);
    app.put('/api/iniciar_parte', authenticated.auth, partesController.iniciarParte);
    app.put('/api/confirmar_parte', authenticated.auth, partesController.confirmarParte);
    app.put('/api/editar_parte_relleno', authenticated.auth, partesController.editarParte);
    app.get('/api/obtener_parte_relleno/:id', authenticated.auth, partesController.getParteRelleno);
    app.get('/api/get-file/:file', partesController.getFile);
    app.get('/api/get-firma/:id', partesController.getFirma);
};