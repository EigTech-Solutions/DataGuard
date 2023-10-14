var maquinaModel = require("../models/maquinaModel");

function listar(req, res) {
    var idInstituicao = req.params.idInstituicao;

    maquinaModel.listar(idInstituicao)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function buscarPC(req, res) {
    var idPC = req.params.idPC;
    var idInstituicao = req.params.idInstituicao;

    maquinaModel.buscarPC(idPC, idInstituicao)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

// cadastro das Maquinas
function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var numeroSerie  = req.body.numeroSerieServer;
    var ip  = req.body.ipServer;
    var sistemaOperacional  = req.body.sistemaOperacionalServer;
    var capMemoriaDisco  = req.body.capMemoriaDiscoServer;
    var capMemoriaRam  = req.body.capMemoriaRamServer;
    var tipoDisco  = req.body.tipoDiscoServer;
    var processador  = req.body.processadorServer;
    var idLaboratorio = req.body.laboratorioServer;
    var idInstituicao = req.body.idInstituicaoServer;

    // Faça as validações dos valores
    if (numeroSerie == undefined) {
        res.status(400).send("Seu numero de serie está undefined!");
    } else if (ip == undefined) {
        res.status(400).send("Seu ip está undefined!");
    } else if (sistemaOperacional == undefined) {
        res.status(400).send("Sua sistema operacional está undefined!");
    } else if (capMemoriaDisco == undefined) {
        res.status(400).send("Sua capacidade de memoria de disco está undefined!");
    } else if (capMemoriaRam == undefined) {
        res.status(400).send("Sua capacidade de memoria de disco está undefined!");
    } else if (tipoDisco == undefined) {
        res.status(400).send("Seu tipo de disco está undefined!");
    } else if (processador == undefined) {
        res.status(400).send("Seu processador está undefined!");
    } else if (idLaboratorio == undefined) {
        res.status(400).send("Seu lab está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        maquinaModel.cadastrar(numeroSerie , ip , sistemaOperacional , capMemoriaDisco, capMemoriaRam, tipoDisco , processador, idLaboratorio, idInstituicao)
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

function atualizar(req, res) {
    var idPC = req.params.idPC;
    var idInstituicao = req.params.idInstituicao;

    var numeroSerie  = req.body.numeroSerieServer;
    var ip  = req.body.ipServer;
    var sistemaOperacional  = req.body.sistemaOperacionalServer;
    var capMemoriaDisco  = req.body.capMemoriaDiscoServer;
    var capMemoriaRam  = req.body.capMemoriaRamServer;
    var tipoDisco  = req.body.tipoDiscoServer;
    var processador  = req.body.processadorServer;
    var idLaboratorio = req.body.laboratorioServer;

    // Faça as validações dos valores
    if (numeroSerie == undefined) {
        res.status(400).send("Seu numero de serie está undefined!");
    } else if (ip == undefined) {
        res.status(400).send("Seu ip está undefined!");
    } else if (sistemaOperacional == undefined) {
        res.status(400).send("Sua sistema operacional está undefined!");
    } else if (capMemoriaDisco == undefined) {
        res.status(400).send("Sua capacidade de memoria de disco está undefined!");
    } else if (capMemoriaRam == undefined) {
        res.status(400).send("Sua capacidade de memoria de disco está undefined!");
    } else if (tipoDisco == undefined) {
        res.status(400).send("Seu tipo de disco está undefined!");
    } else if (processador == undefined) {
        res.status(400).send("Seu processador está undefined!");
    } else if (idLaboratorio == undefined) {
        res.status(400).send("Seu lab está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        maquinaModel.atualizar(idPC, numeroSerie , ip , sistemaOperacional , capMemoriaDisco, capMemoriaRam, tipoDisco , processador, idLaboratorio, idInstituicao)
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


function deletar(req, res) {
    var idPC = req.params.idPC;
    var idInstituicao = req.params.idInstituicao;

    maquinaModel.deletar(idPC, idInstituicao)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar a maquina: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}


module.exports = {
    listar,
    buscarPC,
    cadastrar,
    atualizar,
    deletar
}