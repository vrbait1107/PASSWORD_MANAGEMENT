var express = require("express");
var router = express.Router();
const User = require("../model/Register");
const bcrypt = require("bcryptjs");

function checkEmail(req, res, next) {
  let email = req.body.email;
  User.findOne({ email, email }, function (err, data) {
    if (err) throw err;

    if (data) {
      return res.render("register", {
        title: "Password Management System",
        msg: "Email Alreday Exist",
      });
    }
  });

  next();
}

function checkUsername(req, res, next) {
  let username = req.body.username;
  User.findOne({ username, username }, function (err, data) {
    if (err) throw err;

    if (data) {
      return res.render("register", {
        title: "Password Management System",
        msg: "Username Alreday Exist",
      });
    }
  });

  next();
}

router.get("/", function (req, res, next) {
  res.render("index", { title: "Password Management System" });
});

router.get("/register", (req, res, next) => {
  res.render("register", { title: "Password Management System", msg: "" });
});

router.post("/register", checkEmail, checkUsername, (req, res, next) => {
  let user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.password = bcrypt.hashSync(req.body.password, 10);

  user.save(function (err, data) {
    if (err) throw err;
    res.render("register", {
      title: "Password Management System",
      msg: "Registration Successful",
    });
  });
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
