var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("index", { title: "Password Management System" });
});

router.get("/register", (req, res, next) => {
  res.render("register", { title: "Password Management System" });
});

router.get("/passwordCategory", (req, res, next) => {
  res.render("passwordCategory", { title: "Password Details" });
});

router.get("/addNewCategory", (req, res, next) => {
  res.render("addNewCategory", { title: "Password Management Details" });
});

router.get("/addNewPassword", (req, res, next) => {
  res.render("addNewPassword", { title: "Password Management Details" });
});

router.get("/viewAllPassword", (req, res, next) => {
  res.render("viewAllPassword", { title: "Password Management Details" });
});

module.exports = router;
