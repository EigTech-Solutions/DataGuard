var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

router.get("/listar/:idInstituicao", function (req, res) {
    maquinaController.listar(req, res);
});

router.get("/buscarPC/:idPC/:idInstituicao", function (req, res) {
    maquinaController.buscarPC(req, res);
});

router.post("/cadastrar", function (req, res) {
    maquinaController.cadastrar(req, res);
});

router.put("/atualizar/:idPC/:idInstituicao", function (req, res) {
    maquinaController.atualizar(req, res);
});

router.delete("/deletar/:idPC/:idInstituicao", function (req, res) {
    maquinaController.deletar(req, res);
});


module.exports = router;