var express = require("express");
var router = express.Router();

var dashboardsController = require("../controllers/dashboardsController");

router.get("/dashboardGeral/kpis/:idInstituicao", function (req, res) {
    dashboardsController.buscarDadosKpis(req, res);
});

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

router.get("/dashboardLaboratorio/kpis/:idLaboratorio", function (req, res) {
    dashboardsController.buscarDadosKpisLabs(req, res);
})

router.get("/dashboardLaboratorio/fluxoRede/:idLaboratorio", function (req, res) {
    dashboardsController.buscarFluxoRedeLab(req, res);
})

router.get("/dashboardLaboratorio/fluxoRede/tempoReal/:idLaboratorio", function (req, res) {
    dashboardsController.buscarFluxoRedeLabTempoReal(req, res);
})

router.get("/dashboardLaboratorio/rankingMaquinas/:idLaboratorio", function (req, res) {
    dashboardsController.buscarRankingMaquinas(req, res);
})

router.get("/dashboardLaboratorio/statusMaquinasLab/:idLaboratorio", function (req, res) {
    dashboardsController.buscarStatusMaquinasLaboratorio(req, res);
})

router.get("/dashboardMaquina/informacoesBasicas/:idMaquina", function (req, res) {
    dashboardsController.buscarInfosBasicasMaquina(req, res);
})

router.get("/dashboardMaquina/buscarCpu/:idMaquina", function (req, res) {
    dashboardsController.buscarPorcentagemUsoCpu(req, res);
})

router.get("/dashboardMaquina/buscarCpu/tempoReal/:idMaquina", function (req, res) {
    dashboardsController.buscarPorcentagemUsoCpuTempoReal(req, res);
})

router.get("/dashboardMaquina/fluxoRede/:idMaquina", function (req, res) {
    dashboardsController.buscarFluxoRedeMaquina(req, res);
})

router.get("/dashboardMaquina/fluxoRede/tempoReal/:idMaquina", function (req, res) {
    dashboardsController.buscarFluxoRedeMaquinaTempoReal(req, res);
})

router.get("/dashboardMaquina/memorias/:idMaquina", function (req, res) {
    dashboardsController.buscarDadosMemorias(req, res);
})

router.get("/dashboardGeralAdmin/kpis/:idInstituicao", function (req, res) {
    dashboardsController.buscarDadosKpisAdmin(req, res);
})

router.get("/dashboardGeralAdmin/variacaoEstadoLab/:idInstituicao", function (req, res) {
    dashboardsController.buscarVariacaoStatusLabs(req, res);
})

router.get("/dashboardGeralAdmin/alertas/:idInstituicao", function (req, res) {
    dashboardsController.buscarQtdAlertas(req, res);
})

router.get("/dashboardGeralAdmin/rankingMaquinas/:idInstituicao", function (req, res) {
    dashboardsController.buscarRankingMaquinasAdmin(req, res);
})

router.get("/dashboardGeralAdmin/colaboradoresCadastros/:idInstituicao", function(req, res) {
    dashboardsController.buscarColaboradores(req, res);
})

module.exports = router;