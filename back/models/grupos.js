module.exports = (sequelize, DataTypes) => {
    const grupos = sequelize.define('grupos', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: DataTypes.STRING,
        id_empresa: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    });

    return grupos;
}