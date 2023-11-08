const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const todoController = require("../controllers/todo")
// const moment = require("moment")
dotenv.config();

router.get("/getAll", todoController.getAll);

router.post("/create", todoController.create);

router.delete("/:id", todoController.delete);

module.exports = router;
