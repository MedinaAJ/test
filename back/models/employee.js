module.exports = (sequelize, DataTypes) => {
    const empleados = sequelize.define('empleados', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        id_profile: DataTypes.INTEGER,
        phone: DataTypes.INTEGER,
        lastname: DataTypes.STRING,
        firstname: DataTypes.STRING,
        email: DataTypes.STRING,
        passwd: DataTypes.STRING,
        last_passwd_gen: DataTypes.DATE,
        active: DataTypes.INTEGER,
        last_connection_date: DataTypes.DATE, 
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        field1: DataTypes.STRING,
        field2: DataTypes.STRING,
        super: DataTypes.INTEGER
    });

    return empleados;
}