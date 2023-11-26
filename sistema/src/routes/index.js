var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
    res.redirect("/telaLogin.html");
});

module.exports = router;