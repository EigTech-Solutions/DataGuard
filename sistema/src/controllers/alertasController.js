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

function buscarNotificacoes(req, res) {
    var idInstituicao = req.params.idInstituicao;
    var idUsuario = req.params.idUsuario;

    console.log(`Recuperando as notificações(alertas) da instituição com id ${Number(idInstituicao)} e técnico com id ${idUsuario}`);

    alertasModel.buscarNotificacoes(idInstituicao, idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as notificações.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function marcarLido(req, res) {
    var idNotificacao = req.params.idNotificacao;

    console.log(`Marcando a notificações(alertas) da como lido: id ${Number(idNotificacao)}`);
    alertasModel.marcarLido(idNotificacao)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao marcar como lido! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    buscarQtdAlertasUrgentesAtencaoMes,
    buscarQtdAlertasUrgentesAtencaoAno,
    buscarAlertaPorComponenteMes,
    buscarAlertaPorComponenteAno,
    buscarNotificacoes,
    marcarLido
}