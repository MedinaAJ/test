module.exports = function(sequelize, DataTypes) {
    var empresa = sequelize.define('empresa', {
        id: {
            /*autoIncrement: true,
            primaryKey: true,*/
            type: DataTypes.INTEGER
        },
        name: {
            /*autoIncrement: true,*/
            primaryKey: true,
            type: DataTypes.STRING,
        },
        responsable: DataTypes.STRING,
        phone: DataTypes.STRING,
        logo_small: DataTypes.STRING,
        logo_banner: DataTypes.STRING,
        color_back: DataTypes.STRING,
        color_active: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    });

    return empresa;
};