var express = require("express");
var router = express.Router();

var dashboardsController = require("../controllers/dashboardsController");

router.get("/dashboardGeral/kpis/:idInstituicao", function (req, res) {
    dashboardsController.buscarDadosKpis(req, res);
});

router.get("/notificacoes/:idInstituicao", function (req, res) {
    dashboardsController.buscarNotificacoes(req, res);
})

router.get("/notificacoes/tempoReal/:idInstituicao", function (req, res) {
    dashboardsController.buscarNotificacoesTempoReal(req, res);
})

router.put("/notificacoes/marcarLido/:idNotificacao", function (req, res) {
    dashboardsController.marcarLido(req, res);
})

router.get("/dashboardGeral/fluxoRede/:idInstituicao", function (req, res) {
    dashboardsController.buscarFluxoRede(req, res);
})

router.get("/dashboardGeral/fluxoRede/tempoReal/:idInstituicao", function (req, res) {
    dashboardsController.buscarFluxoRedeTempoReal(req, res);
})

router.get("/dashboardGeral/statusMaquinas/:idInstituicao", function (req, res) {
    dashboardsController.buscarStatusMaquinas(req, res);
})

router.get("/dashboardGeral/rankingLabs/:idInstituicao", function (req, res) {
    dashboardsController.buscarRankingLabs(req, res);
})

module.exports = router;