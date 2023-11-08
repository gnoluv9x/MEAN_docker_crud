const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { collection: "users" }
);

const model = mongoose.model("AuthSchema", AuthSchema);

module.exports = model;
