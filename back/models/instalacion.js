module.exports = function(sequelize, DataTypes) {
    var instalacione = sequelize.define('instalacione', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING,
        },
        provincia: DataTypes.STRING,
        localidad: DataTypes.STRING,
        id_panel: DataTypes.STRING,
        id_empresa: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    });

    return instalacione;
};