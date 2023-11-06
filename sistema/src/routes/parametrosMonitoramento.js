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

module.exports = router;