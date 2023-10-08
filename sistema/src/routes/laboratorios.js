var express = require("express");
var router = express.Router();

var laboratorioController = require("../controllers/laboratorioController");


router.post("/cadastrar", function (req, res) {
    laboratorioController.cadastrarLab(req, res);
})



module.exports = router;