const express = require("express");
const URL = require("../models/url");
const { restrictTo } = require("../middlewares/auth.js");
const router = express.Router();

router.get("/", restrictTo(["NORMAL","ADMIN"]) ,async (req, res) => {
  const allurls = await URL.find({ createdBy: req.user.id });
  return res.render("home", {
    urls: allurls,
  });
});

router.get("/admin/url", restrictTo(["ADMIN"]) ,async (req, res) => {
  const allurls = await URL.find({ });
  return res.render("home", {
    urls: allurls,
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;