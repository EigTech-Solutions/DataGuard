var parametrosModel = require("../models/parametrosModel");

function buscarParametrosMonitoramento(req, res) {
    var idInstituicao = req.params.idInstituicao;

    parametrosModel.buscarParametrosMonitoramento(idInstituicao)
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

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var minCpu = req.body.minCpuServer;
    var maxCpu = req.body.maxCpuServer;
    var minDisco = req.body.minDiscoServer
    var maxDisco = req.body.maxDiscoServer;
    var minQtdDispositivosConectados = req.body.minQtdDispositivosConectadosServer;
    var maxQtdDispositivosConectados = req.body.maxQtdDispositivosConectadosServer;
    var minRam = req.body.minRamServer
    var maxRam = req.body.maxRamServer;
    var idInstituicao = req.body.idInstituicaoServer;

    // Faça as validações dos valores
    if (minCpu == undefined) {
        res.status(400).send("Seu minCpu está undefined!");
    } else if (maxCpu == undefined) {
        res.status(400).send("Seu maxCpu está undefined!");
    } else if (maxDisco == undefined) {
        res.status(400).send("Sua maxDisco está undefined!");
    } else if (minDisco == undefined) {
        res.status(400).send("Seu minDisco está undefined!");
    } else if (maxQtdDispositivosConectados == undefined) {
        res.status(400).send("Seu maxQtdDispositivosConectados está undefined!");
    } else if (minQtdDispositivosConectados == undefined) {
        res.status(400).send("Sua minQtdDispositivosConectados está undefined!");
    } else if (minRam == undefined) {
        res.status(400).send("Seu minRam está undefined!");
    } else if (maxRam == undefined) {
        res.status(400).send("Seu maxRam está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        parametrosModel.cadastrar(minCpu, maxCpu, minDisco, maxDisco, minRam, maxRam, minQtdDispositivosConectados, maxQtdDispositivosConectados, idInstituicao)
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

function atualizarParametros(req, res) {
    var idInstituicao = req.params.idInstituicao;;
    
    var idParametrosMonitoramento = req.body.idParametrosServer;

    if (idInstituicao == undefined) {
        res.status(400).send("Seu idInstituicao está undefined!");
    } else if (idParametrosMonitoramento == undefined) {
        res.status(400).send("Sua idParametrosMonitoramento está undefined!");
    } else {

        parametrosModel.atualizarParametros(idInstituicao, idParametrosMonitoramento)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a atualização! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function resetarParametros(req, res) {
    var idInstituicao = req.params.idInstituicao;;

    if (idInstituicao == undefined) {
        res.status(400).send("Seu idInstituicao está undefined!");
    } else {

        parametrosModel.resetarParametros(idInstituicao)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a atualização! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function deletar(req, res) {
    var idParametros = req.params.idParametros;

    parametrosModel.deletar(idParametros)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar os parâetros antigos: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    buscarParametrosMonitoramento,
    cadastrar,
    atualizarParametros,
    resetarParametros,
    deletar
}