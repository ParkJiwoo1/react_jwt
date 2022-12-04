const express = require("express");

const app = express();
const jwt = require("jsonwebtoken");
app.use(express.json());
const users = [
  {
    id: "1",
    username: "park",
    mail: "park@gmail.com",
    pwd: "a1234",
    isAdmin: true,
  },
  {
    id: "2",
    username: "kim",
    mail: "kim@gmail.com",
    pwd: "b1234",
    isAdmin: true,
  },
];

let refreshTokens = [];

app.post("/api/register", (req, res) => {
  const { username, mail, pwd } = req.body;
  const isAdmin = true;
  const check = users.find((x) => x.mail === mail);
  if (!check) {
    users.push({ username, mail, pwd, isAdmin });
    console.log(users);
    res.json({ username, mail, pwd, isAdmin });
  } else {
    res.json("already exist");
  }
});

app.post("/api/refresh", (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.status(401).json("not authenticated");
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("refresh token is invalid");
  }
  let payload = null;
  try {
    payload = jwt.verify(refreshToken, "myRefreshKey");
    console.log(payload);
  } catch (err) {
    return res.send("accessToken Null");
  }
  const user = users.find((user) => user.id === payload.id);
  if (!user) return res.send("accessToken null");

  const newAccessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);
  refreshTokens.push(newRefreshToken);

  res.status(200).json({
    user: user,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  });
});

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "tokenKey", {
    expiresIn: "1h",
  });
};
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "myRefreshKey");
};

app.post("/api/login", (req, res) => {
  const { mail, pwd } = req.body;
  const user = users.find((x) => {
    return x.mail === mail && x.pwd === pwd;
  });
  if (user) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    refreshTokens.push(refreshToken);
    res.json({
      mail: user.mail,
      isAdmin: user.isAdmin,
      accessToken,
      refreshToken,
    });
  } else {
    res.status(400).json("username or password incorrect");
  }
});

const verify = (req, res, next) => {};

app.delete("/api/users/:userId", verify, (req, res) => {
  if (req.user.id === req.params.userId || req.user.isAdmin) {
    res.status(200).json("user has been deleted");
  } else {
    req.status(403).json("not allowed to delete");
  }
});
app.post("/api/logout", (req, res) => {
  /*const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.status(200).json("logged out successfully");*/
  refreshTokens = [];
  return res.status(200).json("working");
});
app.listen(5000, () => console.log("back running!"));
