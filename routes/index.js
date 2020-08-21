var express = require("express");
var router = express.Router();
const User = require("../model/Register");
const bcrypt = require("bcryptjs");
const PasswordDetails = require("../model/PasswordDetails");

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

// ------------------------>> CREATE OPERATION

router.post("/addPasswordDetails", function (req, res, next) {
  let categoryName = req.body.categoryName;
  let passwordDetails = req.body.passwordDetails;

  let passwordDetailsModel = new PasswordDetails();
  passwordDetailsModel.categoryName = categoryName;
  passwordDetailsModel.passwordDetails = passwordDetails;

  passwordDetailsModel.save(function (err, data) {
    if (err) throw err;
    res.send("Data Successfully Inserted");
  });
});

// ------------------------>> READ OPERATION

router.post("/readPasswordDetails", function (req, res, next) {
  PasswordDetails.find({}, function (err, data) {
    if (err) throw err;
    res.send(data);
  });
});

//------------------------------->> EDIT OPERATION
router.post("/editPasswordDetails", function (req, res, next) {
  let editId = req.body.editId;

  PasswordDetails.findById(editId, function (err, data) {
    if (err) throw err;
    res.send(data);
  });
});

//------------------------------->> UPDATE OPERATION
router.post("/updatePasswordDetails", function (req, res, next) {
  let updateId = req.body.updateId;
  let updateCategoryName = req.body.updateCategoryName;
  let updatePasswordDetailsValue = req.body.updatePasswordDetailsValue;

  PasswordDetails.findByIdAndUpdate(
    updateId,
    {
      categoryName: updateCategoryName,
      passwordDetails: updatePasswordDetailsValue,
    },
    function (err, data) {
      if (err) throw err;
      res.send("Data Successfully Updated");
    }
  );
});

//------------------------------->> VIEW OPERATION
router.post("/viewPasswordDetails", function (req, res, next) {
  let viewId = req.body.viewId;

  PasswordDetails.findById(viewId, function (err, data) {
    if (err) throw err;
    res.send(data);
  });
});

// ------------------------>> DELETE OPERATION

router.post("/deletePasswordDetails", function (req, res, next) {
  let deleteId = req.body.deleteId;

  PasswordDetails.findByIdAndDelete(deleteId, function (err, data) {
    if (err) throw err;
    res.send("Data Successfully Deleted");
  });
});

// -------------------->> GET DASHBOARD
router.get("/dashboard", (req, res, next) => {
  res.render("dashboard", { title: "Password Details" });
});

module.exports = router;
