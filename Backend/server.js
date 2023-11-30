const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo");
const cors = require("cors");
dotenv.config();

const {
  NODE_DOCKER_PORT,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
} = process.env;

const mongodbString = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

console.log("============== Debug_here mongodbString ==============");
console.dir(mongodbString, { depth: null });

const PORT = NODE_DOCKER_PORT || 4000;

mongoose.connect(mongodbString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}, (err) => {
  if (!err) { console.log('MongoDB Connection Succeeded.') }
  else { console.log('Error in DB connection : ' + err) }
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var corsOptions = {
  origin: "http://localhost:4200"
};

//bypass cors
app.use(cors(corsOptions));

// list routes
app.use("/api/auth", authRoutes);
app.use("/api/todo", todoRoutes);

app.listen(PORT, () => {
  console.log(`Connected to server at port : ${PORT}`);
});
