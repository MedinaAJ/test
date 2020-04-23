const employeeController = require('../controllers').employee;
const authenticated = require('../authenticated/authenticated');

var multipart = require('connect-multiparty');
const path = require('path');
var md_upload = multipart({ uploadDir: './server/uploads/empleados' });

module.exports = (app) => {
    app.post('/api/crear_empleado', authenticated.auth, employeeController.create);
    app.post('/api/asignar_empresa_empleado', authenticated.auth, employeeController.createEmpresaEmpleado);
    app.get('/api/empresa_empleado/:id', authenticated.auth, employeeController.getEmpresa);
    app.post('/api/asignar_operario_jefe', authenticated.auth, employeeController.createOperarioJefe);
    app.post('/api/inicio_sesion', employeeController.inicio_sesion);
    app.get('/api/listar_empleados', authenticated.auth, employeeController.getAll);
    app.get('/api/listar_empleados_empresa/:empresa', authenticated.auth, employeeController.getAllEnterprise);
    app.get('/api/obtener_empleado/:id', authenticated.auth, employeeController.getOne);
    app.put('/api/editar_empleado/', authenticated.auth, employeeController.updateOne);
    app.delete('/api/eliminar_empleado/:id', authenticated.auth, employeeController.deleteOne);
    app.delete('/api/eliminar_operarios/:id', authenticated.auth, employeeController.eliminarEmpleados);
    app.delete('/api/eliminar_jefes/:id', authenticated.auth, employeeController.eliminarJefes);
    app.get('/api/recuperar_empleados_asignados/:id/:perfil', authenticated.auth, employeeController.getEmpleadosAsignados);
    

    app.post('/api/upload-user-logo-banner', [authenticated.auth, md_upload], employeeController.uploadBanner);
    app.post('/api/upload-user-logo-small', [authenticated.auth, md_upload], employeeController.uploadSmall);
    app.get('/api/get-image-user/:imageFile', employeeController.getImage);
}