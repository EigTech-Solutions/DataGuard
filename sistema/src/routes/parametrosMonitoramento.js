var express = require("express");
var router = express.Router();

var parametrosController = require("../controllers/parametrosController");

router.get("/buscarParametrosMonitoramento/:idInstituicao", function (req, res) {
    parametrosController.buscarParametrosMonitoramento(req, res);
});

router.post("/cadastrar", function (req, res) {
    parametrosController.cadastrar(req, res);
});

router.put("/atualizarParametros/:idInstituicao", function (req, res) {
    parametrosController.atualizarParametros(req, res);
});

router.put("/resetarParametros/:idInstituicao", function (req, res) {
    parametrosController.resetarParametros(req, res);
});

router.delete("/deletar/:idParametros", function (req, res) {
    parametrosController.deletar(req, res);
});

module.exports = router;