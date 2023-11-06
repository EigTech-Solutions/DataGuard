var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

router.get("/listar/:idInstituicao", function (req, res) {
    maquinaController.listar(req, res);
});

router.get("/buscarPC/:idPC/:idInstituicao", function (req, res) {
    maquinaController.buscarPC(req, res);
});

router.get("/buscarPorIpOrNumSerie/:numBusca/:idInstituicao", function (req, res) {
    maquinaController.buscarPorIpOrNumSerie(req, res);
});

router.post("/cadastrar", function (req, res) {
    maquinaController.cadastrar(req, res);
});

router.put("/atualizar/:idPC/:idInstituicao", function (req, res) {
    maquinaController.atualizar(req, res);
});

router.put("/atualizarStatus/:idPC/:idInstituicao", function (req, res) {
    maquinaController.atualizarStatus(req, res);
});

router.put("/atualizarLaboratorio/:idPC/:idInstituicao", function (req, res) {
    maquinaController.atualizarLaboratorio(req, res);
});

router.delete("/deletar/:idPC/:idInstituicao", function (req, res) {
    maquinaController.deletar(req, res);
});


module.exports = router;