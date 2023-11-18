var alertasModel = require("../models/alertasModel");

function buscarQtdAlertasUrgentesAtencaoMes(req, res) {
    var idLab = req.params.idLab;
    var idInstituicao = req.params.idInstituicao;
    var mes = req.params.mes;
    var ano = req.params.ano;

    alertasModel.buscarQtdAlertasUrgentesAtencaoMes(idLab, idInstituicao, mes, ano)
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

function buscarQtdAlertasUrgentesAtencaoAno(req, res) {
    var idLab = req.params.idLab;
    var idInstituicao = req.params.idInstituicao;
    var ano = req.params.ano;

    alertasModel.buscarQtdAlertasUrgentesAtencaoAno(idLab, idInstituicao, ano)
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

function buscarAlertaPorComponenteMes(req, res) {
    var idLab = req.params.idLab;
    var idInstituicao = req.params.idInstituicao;
    var mes = req.params.mes;
    var ano = req.params.ano;

    alertasModel.buscarAlertaPorComponenteMes(idLab, idInstituicao, mes, ano)
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

function buscarAlertaPorComponenteAno(req, res) {
    var idLab = req.params.idLab;
    var idInstituicao = req.params.idInstituicao;
    var ano = req.params.ano;

    alertasModel.buscarAlertaPorComponenteAno(idLab, idInstituicao, ano)
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

module.exports = {
    buscarQtdAlertasUrgentesAtencaoMes,
    buscarQtdAlertasUrgentesAtencaoAno,
    buscarAlertaPorComponenteMes,
    buscarAlertaPorComponenteAno 
}