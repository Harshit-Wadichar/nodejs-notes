const { getUser } = require("../service/auth");
const jwt = require('jsonwebtoken');
const secretKey = "har$hit*wadi4";
async function restrictToLoggedinUserOnly(req, res, next) {
  const authHeader = req.headers["authorization"];

  // Check if authorization header exists
  if (!authHeader) return res.redirect("/login");

  // Split the header and validate format
  const tokenParts = authHeader.split("Bearer ");
  if (tokenParts.length !== 2) return res.redirect("/login");

  const token = tokenParts[1];
  const user = getUser(token);

  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const authHeader = req.headers["authorization"];
  let user = null;

  // Gracefully handle missing header
  if (authHeader) {
    const tokenParts = authHeader.split("Bearer ");
    // Validate token format before accessing
    if (tokenParts.length === 2) {
      const token = tokenParts[1];
      user = getUser(token);
    }
  }

  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};