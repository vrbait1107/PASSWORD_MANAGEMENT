const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PasswordDetails = new Schema({
  categoryName: String,
  passwordDetails: String,
});

module.exports = mongoose.model("PasswordDetails", PasswordDetails);
