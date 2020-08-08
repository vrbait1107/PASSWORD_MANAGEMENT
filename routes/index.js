var express = require("express");
var router = express.Router();
const User = require("../model/Register");
const bcrypt = require("bcryptjs");

// -------------------->>  MIDDLEWARE CHECK EMAIL
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

// -------------------->> MIDDLEWARE CHECK USERNAME
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

// -------------------->> GET LOGIN
router.get("/", function (req, res, next) {
  res.render("index", { title: "Password Management System", msg: "" });
});

// -------------------->> POST LOGIN
router.post("/", function (req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  let checkUser = User.findOne({ username: username });

  checkUser.exec(function (err, data) {
    if (err) throw err;

    if (data) {
      let hashPassword = data.password;

      if (bcrypt.compareSync(password, hashPassword)) {
        res.redirect("/dashboard");
      } else {
        res.render("index", {
          title: "Password Management System",
          msg: "Check Your Credentials",
        });
      }
    }
  });
});

// -------------------->> GET REGISTER
router.get("/register", (req, res, next) => {
  res.render("register", { title: "Password Management System", msg: "" });
});

// -------------------->> POST REGISTER
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

// -------------------->> GET DASHBOARD
router.get("/dashboard", (req, res, next) => {
  res.render("dashboard", { title: "Password Details" });
});

module.exports = router;
