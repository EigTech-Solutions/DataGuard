var usuarioModel = require("../models/usuarioModel");
var aquarioModel = require("../models/aquarioModel");
var maquinaModel = require("../models/maquinaModel");


// cadastro das Maquinas

function cadastrarMaquina(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html

    var numeroSerie  = req.body.numeroSerieServer;
    var Ip  = req.body.IpServer;
    var sistemaOperacional  = req.body.sistemaOperacionalServer;
    var capMemoria  = req.body.capMemoriaServer;
    var tipoDisco  = req.body.tipoDiscoServer;
    var processador  = req.body.processadorServer;
    var laboratorio = req.body.laboratorioServer;

    // Faça as validações dos valores
    if (numeroSerie == undefined) {
        res.status(400).send("Seu numero de serie está undefined!");
    } else if (Ip == undefined) {
        res.status(400).send("Seu ip está undefined!");
    } else if (sistemaOperacional == undefined) {
        res.status(400).send("Sua sistema operacional está undefined!");
    } else if (capMemoria == undefined) {
        res.status(400).send("Sua capacidade de memoria está undefined!");
    } else if (tipoDisco == undefined) {
        res.status(400).send("Seu tipo de disco está undefined!");
    } else if (processador == undefined) {
        res.status(400).send("Seu processador está undefined!");
    } else if (laboratorio == undefined) {
        res.status(400).send("Seu lab está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(numeroSerie , Ip , sistemaOperacional , sistemaOperacional, capMemoria , tipoDisco , processador , laboratorio )
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
    cadastrarMaquina
}