const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true, unique: true },
    status: { type: String, required: true },
    createdAt: { type: Number, required: false },
  },
  { collection: "todos" }
);

const model = mongoose.model("TodoSchema", TodoSchema);

module.exports = model;
