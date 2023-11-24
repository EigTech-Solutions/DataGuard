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

router.get("/buscarTotalPcsInstituicao/:idInstituicao", function (req, res) {
    maquinaController.buscarTotalPcsInstituicao(req, res);
});

router.get("/buscarTotalPcsLab/:idLab/:idInstituicao", function (req, res) {
    maquinaController.buscarTotalPcsLab(req, res);
});

router.get("/buscarTotalPcsAtivosInativos/:idLab/:idInstituicao", function (req, res) {
    maquinaController.buscarTotalPcsAtivosInativos(req, res);
});

router.get("/buscarTotalPcsCadastradosDesativadosMes/:idLab/:idInstituicao/:mes/:ano", function (req, res) {
    maquinaController.buscarTotalPcsCadastradosDesativadosMes(req, res);
});

router.get("/buscarTotalPcsCadastradosDesativadosAno/:idLab/:idInstituicao/:ano", function (req, res) {
    maquinaController.buscarTotalPcsCadastradosDesativadosAno(req, res);
});

router.get("/buscarPcsDesativadosMes/:idLab/:idInstituicao/:mes/:ano", function (req, res) {
    maquinaController.buscarPcsDesativadosMes(req, res);
});

router.get("/buscarPcsDesativadosAno/:idLab/:idInstituicao/:ano", function (req, res) {
    maquinaController.buscarPcsDesativadosAno(req, res);
});

router.get("/buscarIndicePreocupacao/:idMaquina/:idInstituicao", function(req, res){
    maquinaController.buscarIndicePreocupacao(req, res);
});

module.exports = router;