const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo");
const cors = require("cors");
dotenv.config();

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to Mongodb");
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//bypass cors
app.use(cors());

// list routes
app.use("/api/auth", authRoutes);
app.use("/api/todo", todoRoutes);

app.listen(PORT, () => {
  console.log(`Connected to server at port : ${PORT}`);
});
