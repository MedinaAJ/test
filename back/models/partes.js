module.exports = (sequelize, DataTypes) => {
    const partes = sequelize.define('partes', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        id_plantilla: DataTypes.INTEGER,
        id_empresa: DataTypes.INTEGER,
        version: DataTypes.INTEGER,
        nombre_obra: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    });

    return partes;
}