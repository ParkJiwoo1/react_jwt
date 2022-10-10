const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
app.use(express.json());
const users = [
  {
    id: "1",
    username: "park",
    pwd: "a1234",
    isAdmin: true,
  },
  {
    id: "2",
    username: "jane",
    pwd: "Jane0908",
    isAdmin: false,
  },
];

app.post("/api/login", (req, res) => {
  const { username, pwd } = req.body;
  const user = users.find((x) => {
    return x.username === username && x.pwd === pwd;
  });
  if (user) {
    const accessToken = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      "tokenKey"
    );
    res.json({
      username: user.username,
      isAdmin: user.isAdmin,
      accessToken,
    });
  } else {
    res.status(400).json("username or password incorrect");
  }
});

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "tokenKey", (err, user) => {
      if (err) {
        return res.status(403).json("token invalid");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("not authenticated");
  }
};
app.delete("/api/users/:userId", verify, (req, res) => {
  if (req.user.id === req.params.userId || req.user.isAdmin) {
    res.status(200).json("user has been deleted");
  } else {
    req.status(403).json("not allowed to delete");
  }
});
app.listen(5000, () => console.log("back running"));
