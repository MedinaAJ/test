var conexionexternaController = require('../controllers').conexionexterna;
var authenticated = require('../authenticated/authenticated');

module.exports = function(app) {

    app.post('/api/test_conexion', authenticated.auth, conexionexternaController.test_conexion);

};