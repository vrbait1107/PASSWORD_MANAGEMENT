var express = require("express");
var router = express.Router();

// -------------------->> GET DASHBOARD
router.get("/dashboard", (req, res, next) => {
  res.render("dashboard", { title: "Password Details" });
});

module.exports = router;
