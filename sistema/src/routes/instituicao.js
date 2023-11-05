var express = require("express");
var router = express.Router();

var instituicaoController = require("../controllers/instituicaoController");

router.post("/cadastrar", function (req, res) {
    instituicaoController.cadastrar(req, res);
});

module.exports = router;