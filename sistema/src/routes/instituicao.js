var express = require("express");
var router = express.Router();

var instituicaoController = require("../controllers/instituicaoController");

router.post("/cadastrar", function (req, res) {
    instituicaoController.cadastrar(req, res);
});

router.get("/puxarDados", function (req, res) {
    instituicaoController.puxarDados(req, res);
});

router.get("/dadosInstituicao", function (req, res) {
    instituicaoController.dadosInstituicao(req, res);
});

router.get("/dadosGeraisInst", function(req, res){
    instituicaoController.dadosGeraisInst(req, res);
});

router.get("/dashDatas", function(req, res){
    instituicaoController.dashDatas(req, res);
});

router.delete("/deletarInstituicao/:idInstitucional", function (req, res) {
    instituicaoController.deletarInstituicao(req, res);
});

router.get("/dadosUsuario", function (req, res) {
    instituicaoController.dadosUsuario(req, res);
});

router.delete("/deletarUsuario/:idUsuario", function (req, res) {
    instituicaoController.deletarUsuario(req, res);
});

router.get("/dadosGeraisUser", function(req, res){
    instituicaoController.dadosGeraisUser(req, res);
});

router.get("/puxarUser", function (req, res) {
    instituicaoController.puxarUser(req, res);
});

router.get("/puxarMaquinas", function (req, res) {
    instituicaoController.puxarMaquinas(req, res);
});

router.get("/puxarLabs", function (req, res) {
    instituicaoController.puxarLabs(req, res);
});

router.put("/editarInst/:idInstituicional", function (req, res) {
    usuarioController.editarInst(req, res);
});

module.exports = router;