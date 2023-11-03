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

function buscarNotificacoes(req, res) {
    var idInstituicao = req.params.idInstituicao;
    var idTecnico = req.params.idTecnico;

    console.log(`Recuperando as notificações(alertas) da instituição com id ${Number(idInstituicao)} e técnico com id ${idTecnico}`);

    dashboardsModel.buscarNotificacoes(idInstituicao, idTecnico).then(function (resultado) {
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

function buscarNotificacoesTempoReal(req, res) {
    var idInstituicao = req.params.idInstituicao;

    console.log(`Recuperando as notificações(alertas) da instituição com id ${Number(idInstituicao)}`);

    dashboardsModel.buscarNotificacoesTempoReal(idInstituicao).then(function (resultado) {
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
    dashboardsModel.marcarLido(idNotificacao)
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

function buscarFluxoRede(req, res) {
    var idInstituicao = req.params.idInstituicao;

    console.log(`Recuperando dados de fluxo de rede`);

    dashboardsModel.buscarFluxoRede(idInstituicao).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos dados de fluxo de rede.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarFluxoRedeTempoReal(req, res) {
    var idInstituicao = req.params.idInstituicao;

    console.log(`Recuperando dados de fluxo de rede em tempo real`);

    dashboardsModel.buscarFluxoRedeTempoReal(idInstituicao).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos dados de fluxo de rede.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarStatusMaquinas(req, res) {
    var idInstituicao = req.params.idInstituicao;

    console.log(`Recuperando dados de status maquinas`);

    dashboardsModel.buscarStatusMaquinas(idInstituicao).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos dados de status das máquinas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarRankingLabs(req, res) {
    var idInstituicao = req.params.idInstituicao;

    console.log(`Recuperando o ranking de laboratórios`);

    dashboardsModel.buscarRankingLabs(idInstituicao).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos dados do ranking de labs.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarDadosKpis,
    buscarNotificacoes,
    buscarFluxoRede,
    buscarFluxoRedeTempoReal,
    buscarStatusMaquinas,
    buscarRankingLabs,
    buscarNotificacoesTempoReal,
    marcarLido
}