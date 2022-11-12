require("dotenv").config();
require("./config/database").connect();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const express = require("express");

const app = express();

app.use(express.json());

const User = require("./model/user");
const verifyToken = require("./middleware/auth");
const Task = require("./model/task");

// Register
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    const userData = { id: user._id, email: user.email };
    res.status(201).json({ userData });
  } catch (err) {
    console.log(err);
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      res.status(200).json({ token });
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

app.get("/user", verifyToken, async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token =
      req.body.token ||
      req.query.token ||
      req.headers["x-access-token"] ||
      authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    console.log("🚀 ~ file: app.js ~ line 86 ~ app.get ~ decoded", decoded);
    const user = {
      id: decoded.user_id,
      email: decoded.email,
    };

    res.status(201).json({ user });
  } catch (err) {
    console.log(err);
  }
});

app.post("/create-task", verifyToken, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).send("Please Enter the task name");
    }

    const taskCreted = await Task.create({
      name: name.toLowerCase(),
    });
    const task = {
      name: taskCreted.name,
      id: taskCreted._id,
    };
    res.status(201).json({ task });
  } catch (err) {
    console.log(err);
  }
});

app.get("/list-task", verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find({}).select("name");
    res.status(201).json({ tasks });
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
