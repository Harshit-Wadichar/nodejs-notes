const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
      const tokenCookieValue = req.cookies[cookieName];
  
      if (!tokenCookieValue) {
        return next();
      }
  
      try {
        const userPayload = validateToken(tokenCookieValue);
        req.user = userPayload;
      } catch (err) {
        console.error("Token validation failed:", err);
        res.clearCookie("token"); // Clear invalid token
      }
  
      return next();
    };
  }

module.exports = {
    checkForAuthenticationCookie,
};