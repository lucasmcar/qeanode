const Sequelize = require('sequelize');
const con = require('../database');

const Pergunta = con.define('pergunta', {
    //Definição dos campos
    titulo :{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force: false})
.then(() => {});

module.exports = Pergunta;