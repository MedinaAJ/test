const gruposController = require('../controllers').grupos;
const authenticated = require('../authenticated/authenticated');

module.exports = (app) => {
    app.post('/api/crear_grupo', authenticated.auth, gruposController.create);
    app.post('/api/crear_grupo_plantilla', authenticated.auth, gruposController.createR);
    app.get('/api/listar_grupos/:id', authenticated.auth, gruposController.getAll);
    app.get('/api/obtener_grupo/:id/', authenticated.auth, gruposController.getOne);
    app.get('/api/obtener_plantillas_grupo/:id/', authenticated.auth, gruposController.getTemplates);
    app.put('/api/editar_grupo/', authenticated.auth, gruposController.updateOne);
    app.delete('/api/eliminar_grupo/:id', authenticated.auth, gruposController.deleteOne);
}