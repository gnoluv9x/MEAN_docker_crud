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

TodoSchema.method("toJSON", function () {
  // eslint-disable-next-line no-unused-vars
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const model = mongoose.model("TodoSchema", TodoSchema);

module.exports = model;
