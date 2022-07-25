require("dotenv").config();
const { JWT_SECRET: secretToken } = process.env;
const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => { // validate token
  const token = req.headers.authorization?.split(' ').pop();
  if (!token) {
    return res.status(401).json({ error: "Access denied, token required" });
  }
  try {
    jwt.verify(token, secretToken, (err, decoded) => {
      if (err) {
        return res.status(409).json({ error: "Invalid or expired token" });
      } else {
        next();
      }
    });
  } catch (error) {
    return res.status(401).json({ error: "Access denied" });
  }
};

const getToken = (user) => { // get token for user
    const payload = {
        username: user.username,
        email: user.email,
        role: user.role,
    };
    const token = jwt.sign(payload, secretToken, {
        expiresIn: "1h",
    });
    return token;
}

const decodeToken = (token) => { // decode token
    const decoded = jwt.verify(token, secretToken);
    return decoded;
}

const isAdmin = (user) => { // check if user is admin
    return user.role === "ADMIN";
}
module.exports = {validateToken, getToken, decodeToken, isAdmin};
