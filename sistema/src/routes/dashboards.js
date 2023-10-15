var express = require("express");
var router = express.Router();

var dashboardsController = require("../controllers/dashboardsController");

router.get("/dashboardGeral/kpis/:idInstituicao", function (req, res) {
    dashboardsController.buscarDadosKpis(req, res);
});

module.exports = router;