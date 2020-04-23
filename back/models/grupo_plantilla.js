module.exports = (sequelize, DataTypes) => {
    const grupo_plantilla = sequelize.define('grupo_plantilla', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        id_group: {
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        id_template: {
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    })

    return grupo_plantilla;
}