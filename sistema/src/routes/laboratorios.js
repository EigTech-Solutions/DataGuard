var express = require("express");
var router = express.Router();

var laboratorioController = require("../controllers/laboratorioController");

router.get("/listar/:idInstituicao", function (req, res) {
    laboratorioController.listar(req, res);
});

router.post("/cadastrar", function (req, res) {
    laboratorioController.cadastrar(req, res);
});

router.put("/atualizar", function (req, res) {
    laboratorioController.atualizar(req, res);
});

router.delete("/deletar/:idLab/:idInstituicao", function (req, res) {
    laboratorioController.deletar(req, res);
});


module.exports = router;