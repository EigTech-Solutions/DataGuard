var laboratorioModel = require("../models/laboratorioModel");

function listar(req, res) {
    var idInstituicao = req.params.idInstituicao;

    laboratorioModel.listar(idInstituicao)
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

// cadastro dos laboratorios
function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nomeLab = req.body.nomeLabServer;
    var numLab = req.body.numLabServer;
    var respLab = req.body.respLabServer;
    var idInstituicaoLab = req.body.idInstituicaoServer;
   

    // Faça as validações dos valores
    if (nomeLab == undefined) {
        res.status(400).send("Seu nome de laboratorio está undefined!");
    } else if (numLab == undefined) {
        res.status(400).send("Seu numero de laboratorio está undefined!");
    } else if (respLab == undefined) {
        res.status(400).send("Seu responsável está undefined!");
    } else if (idInstituicaoLab == undefined) {
        res.status(400).send("O idInstituição está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo laboratorioModel.js
        laboratorioModel.cadastrar(nomeLab, numLab, respLab, idInstituicaoLab)
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
    var idLab = req.params.idLab;
    var idInstituicao = req.params.idInstituicao;

    laboratorioModel.deletar(idLab, idInstituicao)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o laboratório: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}


module.exports = {
    listar,
    cadastrar,
    deletar
}