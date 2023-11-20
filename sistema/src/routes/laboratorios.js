var express = require("express");
var router = express.Router();

var laboratorioController = require("../controllers/laboratorioController");

router.get("/listar/:idInstituicao", function (req, res) {
    laboratorioController.listar(req, res);
});

router.get("/buscarLab/:idLab/:idInstituicao", function (req, res) {
    laboratorioController.buscarLab(req, res);
});

router.post("/cadastrar", function (req, res) {
    laboratorioController.cadastrar(req, res);
});

router.put("/atualizar/:idLab/:idInstituicao", function (req, res) {
    laboratorioController.atualizar(req, res);
});

router.put("/preDelete/:idLab/:idInstituicao", function (req, res) {
    laboratorioController.preDelete(req, res);
});

router.delete("/deletar/:idLab/:idInstituicao", function (req, res) {
    laboratorioController.deletar(req, res);
});

router.get("/buscarNivelPreocupacaoLab/:idLab/:idInstituicao", function (req, res) {
    laboratorioController.buscarNivelPreocupacaoLab(req, res);
});

router.get("/buscarNivelPreocupacaoLabs/:idInstituicao", function (req, res) {
    laboratorioController.buscarNivelPreocupacaoLabs(req, res);
});


module.exports = router;