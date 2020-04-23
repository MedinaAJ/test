var jefeController = require('../controllers').jefe;
var authenticated = require('../authenticated/authenticated');

var multipart = require('connect-multiparty');
var path = require('path');
var md_upload = multipart({ uploadDir: './server/uploads/jefe' });

module.exports = function(app) {
    app.get('/api/obtener_empresa_de_empleado/:id', authenticated.auth, jefeController.obtenerEmpresadeEmpleado);

    app.post('/api/upload-jefe-logo-banner', [authenticated.auth, md_upload], jefeController.uploadBanner);
    app.post('/api/upload-jefe-logo-small', [authenticated.auth, md_upload], jefeController.uploadSmall);
    app.get('/api/get-image-jefe/:imageFile', jefeController.getImage);

};