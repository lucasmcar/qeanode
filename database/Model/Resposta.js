const Sequelize = require('sequelize');
const con = require('../database');

const Resposta = con.define('resposta', {
    //Definição dos campos
    corpo :{
        type: Sequelize.TEXT,
        allowNull: false
    },
    pergunta_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

Resposta.sync({force: false})
.then(() => {});

module.exports = Resposta;