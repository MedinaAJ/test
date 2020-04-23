module.exports = (sequelize, DataTypes) => {
    const plantillas = sequelize.define('plantillas', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        version: DataTypes.INTEGER,
        id_group: DataTypes.INTEGER,
        name: DataTypes.STRING,
        template: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        id_template: DataTypes.INTEGER,
        header: DataTypes.STRING,
        footer: DataTypes.STRING,
        id_empresa: DataTypes.INTEGER
    })

    return plantillas;
}