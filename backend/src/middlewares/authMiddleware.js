const jwt = require("jsonwebtoken"); 
const { SECRET } = require("../constants"); 

const revokedTokens = [];

// Middleware for token authentication
exports.auth = (req, res, next) => {
  req.token = req.header("X-Authorization");

  if (req.token && !revokedTokens.includes(req.token)) {
    try {
      const decodedToken = jwt.verify(req.token, SECRET);
      req.user = decodedToken;
      next();
    } catch (error) {
      res.status(401).json({ message: "You are not authorized!" });
    }
  } else {
    next(); 
  }
};

// Middleware to check user authentication
exports.isAuth = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: "You are not authorized!" });
  } else {
    next();
  }
};

// Function to revoke tokens
exports.revokeToken = (token) => {
  revokedTokens.push(token);
};