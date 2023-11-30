const TodoModel = require("../model/todo")
const { v4: uuidv4 } = require('uuid')

exports.getAll = async (req, res) => {
  try {
    const resp = await TodoModel.find({});
    const respData = resp.map(({ status, title, id, createdAt }) => ({
      status,
      title,
      id,
      createdAt,
    }));
    res.status(200).json(respData);
  } catch (error) {
    console.log("Debug_here error: ", error);
    res.status(300).json({ status: "error", error: error?.message || "Thất bại" });
  }
}

exports.create = async (req, res) => {
  try {
    const { title, status } = req.body;
    if (!title || !status) throw "Thiếu trường"

    const currentTime = new Date();
    await TodoModel.create({ title, status, id: uuidv4(), createdAt: currentTime.getTime() });
    res.status(200).json({ status: "success", msg: "Tạo thành công." });
  } catch (error) {
    console.log(error);
    res.status(300).json({ status: "error", error: error?.message || "Tạo thất bại." });
  }
}

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    await TodoModel.findOneAndDelete({ id: { $eq: id } }, (err) => {
      if (err) {
        res.status(404).send({
          message: `Cannot delete todo with id=${id}. Maybe todo was not found!`
        });
      } else {
        res.send({
          message: "Todo was deleted successfully!"
        });
      }

    })
  } catch (error) {
    console.log("Debug_here error: ", error);
    res.status(500).send({
      message: "Could not delete todo"
    });
  }
};