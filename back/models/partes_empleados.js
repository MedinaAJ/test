module.exports = (sequelize, DataTypes) => {
    const partes_empleados = sequelize.define('partes_empleados', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        id_parte: DataTypes.INTEGER,
        id_empleado: DataTypes.INTEGER,
        parte_relleno: DataTypes.STRING,
        fecha_inicio: DataTypes.DATE,
        fecha_fin: DataTypes.DATE,
        localizacion_inicio: DataTypes.STRING,
        localizacion_fin: DataTypes.STRING,
        jefe_mando: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        fecha_vencimiento: DataTypes.DATE
    });

    return partes_empleados;
}