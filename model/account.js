const mongoose = require("mongoose");

const Account = mongoose.Schema({
  username: { type: String },
  bankName: { type: String },
  accountType: { type: String },
  ownerName: { type: String },
  creditCardLimit: { type: Number },
});

module.exports = mongoose.model("account", Account);
