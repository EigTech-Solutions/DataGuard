var usuarioModel = require("../models/usuarioModel");
var aquarioModel = require("../models/aquarioModel");


// cadastro dos laboratorios

function cadastrarLab(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nomeLab = req.body.nomeLabServer;
    var numLab = req.body.numLabServer;
    var respLab = req.body.respLabServer;
   

    // Faça as validações dos valores
    if (nomeLab == undefined) {
        res.status(400).send("Seu nome de laboratorio está undefined!");
    } else if (numLab == undefined) {
        res.status(400).send("Seu numero de laboratorio está undefined!");
    } else if (respLab == undefined) {
        res.status(400).send("Seu responsável está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nomeLab, numLab, respLab)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}



module.exports = {
    cadastrarLab
}