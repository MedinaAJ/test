const plantillasController = require('../controllers').plantillas;
const authenticated = require('../authenticated/authenticated');

var multipart = require('connect-multiparty');
const path = require('path');
var md_upload = multipart({ uploadDir: './server/uploads/templates' });

module.exports = (app) => {
    app.post('/api/crear_plantilla', authenticated.auth, plantillasController.create);
    app.get('/api/listar_plantillas/:id', authenticated.auth, plantillasController.getAll);
    app.get('/api/listar_plantillas_grupo/:id/:idg', authenticated.auth, plantillasController.getAllG);
    app.get('/api/obtener_plantilla/:id', authenticated.auth, plantillasController.getOne);
    app.get('/api/obtener_ultimo_id_plantilla', authenticated.auth, plantillasController.getLastId);
    app.get('/api/obtener_ultima_plantilla/:id', authenticated.auth, plantillasController.getLast);
    app.put('/api/editar_plantilla/', authenticated.auth, plantillasController.updateOne);
    app.delete('/api/eliminar_plantilla/:id/:version', authenticated.auth, plantillasController.deleteOne);

    app.post('/api/upload-header-template/:id', [authenticated.auth, md_upload], plantillasController.uploadHeader);
    app.get('/api/get-header-template/:imageFile', plantillasController.getImageHeader);

    app.post('/api/upload-footer-template/:id', [authenticated.auth, md_upload], plantillasController.uploadFooter);
    app.get('/api/get-footer-template/:imageFile', plantillasController.getImageFooter);
}