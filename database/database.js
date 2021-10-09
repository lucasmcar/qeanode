const Sequelize = require('sequelize');

const con = new Sequelize('db_qea_node', 'root', 'Lucas1990',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = con;



