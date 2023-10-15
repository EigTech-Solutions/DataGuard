var dashboardsModel = require("../models/dashboardsModel");

function buscarDadosKpis(req, res) {

    var idInstituicao = req.params.idInstituicao;

    console.log(`Recuperando os ultimos KPIs da instituição com id ${Number(idInstituicao)}`);

    dashboardsModel.buscarUltimosKPIs(idInstituicao).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os KPIs.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasEmTempoReal(req, res) {

    var idAquario = req.params.idAquario;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoReal(idAquario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarNotificacoes(req, res) {
    var idInstituicao = req.params.idInstituicao;

    console.log(`Recuperando as notificações(alertas) da instituição com id ${Number(idInstituicao)}`);

    dashboardsModel.buscarNotificacoes(idInstituicao).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os KPIs.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarDadosKpis,
    buscarMedidasEmTempoReal,
    buscarNotificacoes
}