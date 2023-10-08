var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");


router.post("/cadastrar", function (req, res) {
    maquinaController.cadastrarMaquina(req, res);
})




module.exports = router;
