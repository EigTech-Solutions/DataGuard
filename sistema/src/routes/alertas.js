var express = require("express");
var router = express.Router();

var alertasController = require("../controllers/alertasController");

router.get("/buscarQtdAlertasUrgentesAtencaoMes/:idLab/:idInstituicao/:mes/:ano", function (req, res) {
    alertasController.buscarQtdAlertasUrgentesAtencaoMes(req, res);
});

router.get("/buscarQtdAlertasUrgentesAtencaoAno/:idLab/:idInstituicao/:ano", function (req, res) {
    alertasController.buscarQtdAlertasUrgentesAtencaoAno(req, res);
});

router.get("/buscarAlertaPorComponenteMes/:idLab/:idInstituicao/:mes/:ano", function (req, res) {
    alertasController.buscarAlertaPorComponenteMes(req, res);
});

router.get("/buscarAlertaPorComponenteAno/:idLab/:idInstituicao/:ano", function (req, res) {
    alertasController.buscarAlertaPorComponenteAno(req, res);
});
router.get("/notificacoes/buscarNotificacoes/:idInstituicao/:idUsuario", function (req, res) {
    alertasController.buscarNotificacoes(req, res);
})

router.put("/notificacoes/marcarLido/:idNotificacao", function (req, res) {
    alertasController.marcarLido(req, res);
})

module.exports = router;