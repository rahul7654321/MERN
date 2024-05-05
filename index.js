const express = require("express");

const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();

app.use(express.json());

const users = [
  {
    username: "rahul@gmail.com",
    password: "rahul@123",
    name: "rahul manisekaran",
  },
  {
    username: "harkirat@gmail.com",
    password: "123",
    name: "harkirat singh",
  },
  {
    username: "priya@gmail.com",
    password: "123321",
    name: "Priya kumari",
  },
];

function userExits(username, password) {
  const user = users.find((user) => user.username === username);
  if (user && user.password === password) {
    return user;
  }
  return null;
}

app.post("/sign", function (req, res) {
  const { username, password } = req.body;

  if (!userExits(username, password)) {
    // return res.status(403).json({message : "user not found"});
    return res.status(403).json({ msg: "user not found in db" });
  }

  var token = jwt.sign({ username: username }, jwtPassword);
  return res.json({ token });
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  try {
    const decode = jwt.verify(token, jwtPassword);
    const username = decode.username;
    res.json({ users: users });
  } catch (err) {
    return res.status(403).json({ msg: "unauthorized user" });
  }
});

app.listen(3000);
