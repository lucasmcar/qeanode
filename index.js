const express = require('express');
const app = express();

//importa a conexao com o banco
const con = require('./database/database');
const Pergunta = require('./database/Model/Pergunta');
const Resposta = require('./database/Model/Resposta');

con
    .authenticate()
    .then(() => { console.log('Conexão realizada com sucesso'); })
    .catch((msgErro) =>{ console.log('Não foi possível conectar'); })


app.set('view engine', 'ejs');

//Carrega arquivos css, js ,imagem
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/', function(req, res){
    //Buscando as perguntas no banco de forma ordenada
    Pergunta.findAll({ raw: true, order:[
        ['id', 'DESC']
    ]})
        .then(perguntas => {
            res.render("index", {
                perguntas: perguntas
            });
        });
});

//Rota para formular perguntas
app.get('/doquestion', (req, res) => {
    res.render('doquestion');
});

//Enviando dados do formulário para o banco
app.post('/perguntar', (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    //Salvando os dados no banco
    Pergunta.create({
       titulo: titulo,
       descricao : descricao
    }).then(() => {
        res.redirect('/');
    });
});

app.post('/responder', (req, res) => {
    var corpo = req.body.corpo;
    var pergunta_id = req.body.pergunta_id;

    Resposta.create({
        pergunta_id: pergunta_id,
        corpo: corpo
    }).then(() => {
        res.redirect("/pergunta/"+pergunta_id);
    });
})

app.get('/pergunta/:id', (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {
            id: id
        }
    }).then(pergunta => {
        if(pergunta != undefined){

            Resposta.findAll({
                where: { pergunta_id: pergunta.id},
                order:[ ['id', 'DESC'] ]
            }).then(resposta => {
                res.render('pergunta', {
                    pergunta: pergunta,
                    resposta: resposta
                });
            });
        } else {
            res.redirect('/');
        }
    })
});


app.listen(4000, ()=>{
    console.log("App rodando");
});

