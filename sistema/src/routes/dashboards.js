var express = require("express");
var router = express.Router();

var dashboardsController = require("../controllers/dashboardsController");

router.get("/dashboardGeral/kpis/:idInstituicao", function (req, res) {
    dashboardsController.buscarDadosKpis(req, res);
});

router.get("/notificacoes/:idInstituicao", function (req, res) {
    dashboardsController.buscarNotificacoes(req, res);
})

router.get("/dashboardGeral/fluxoRede/:idInstituicao", function (req, res) {
    dashboardsController.buscarFluxoRede(req, res);
})

router.get("/dashboardGeral/fluxoRede/tempoReal/:idInstituicao", function (req, res) {
    dashboardsController.buscarFluxoRedeTempoReal(req, res);
})

module.exports = router;