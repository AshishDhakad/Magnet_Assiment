const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ msg: "Unauthorized" });

  req.user = jwt.verify(token, process.env.JWT_SECRET);
  next();
};

