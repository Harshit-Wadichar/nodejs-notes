const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user)
    return res.render("signup", {
      error: "email id already in use",
    });
  else{
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user)
    return res.render("login", {
      error: "Invalid Username or Password",
    });
  
  const token = setUser(user);
 return res.json({token}); // Cookie name = "token"
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};