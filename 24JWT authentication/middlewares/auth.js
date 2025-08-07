const { getUser } = require("../service/auth");
const jwt = require('jsonwebtoken');
const secretKey = "har$hit*wadi4";

async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.token;
  //by using ? we determine that the code will not give
  //  error when no value to the cookie is parsed or passed

  if (!userUid) return res.redirect("/login");
  const user = getUser(userUid);

  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.token;

  const user = getUser(userUid);

  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};