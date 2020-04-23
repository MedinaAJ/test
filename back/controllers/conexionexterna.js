const { Sequelize } = require('sequelize');

async function test_conexion(req, res) {

    var conexion = req.body;

    const sequelize = new Sequelize(conexion.namedb, conexion.user, conexion.pass, {
        host: conexion.host,
        dialect: 'mariadb'
    });

    try {
        await sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');

            sequelize
            .query('SHOW TABLES')
            .then(result => {
                res.status(200).send({ message: 'Conexion establecida', 'datos_tablas': result });
                sequelize.close();
            })
            .catch(() => {
                res.status(200).send({ message: 'Conexion establecida', tablas_conexion: [] });
                sequelize.close();
            });

        })
        .catch(() => {
            console.error('Unable to connect to the database:', error);
            sequelize.close();
            res.status(200).send({ message: 'Error en la conexion', tablas_conexion: [] });
        }); 
    } catch (error) {
        sequelize.close()
        res.status(200).send({ message: 'Error en la conexion' });
    }
}

module.exports = {
    test_conexion
}