const users = require("../database/models/users");
const { JWT_SECRET: secretToken } = process.env;
const jwt = require("jsonwebtoken");

const findUser = async (User) => {
  const { email } = User;
  const userFinded = await users.findOne({ email });
  return userFinded;
};

const isAdmin = async (User) => {
  const { role } = User;
  if (role === "admin") {
    return true;
  }
  return false;
};

const createUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    const user = { username, email, password };

    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    )
      return res.status(400).json({ error: "Missing fields" });

    if (password !== confirmPassword)
      return res.status(400).json({ error: "Password doesn't match" });

    if (await findUser(user))
      return res.status(400).json({ error: "User already exists" });

    await users.create(user);
    return res.status(201).json({ success: "User created successfully!" });
  } catch (error) {
    next(error);
  }
};
const updateUser = (req, res) => {
  const { id } = req.params;
  try {
    const { username, email } = req.body;
    const user = users.find((user) => user.id === id);
    if (!isAdmin(user)) {
    return res.status(401).json({ error: "Only admins cand update users" });
    }
    user.username = username;
    user.email = email;
    return res
      .status(200)
      .json({ message: "User has been updated succesfully!", user });
  } catch (error) {
    next(error);
  }
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);
  if (!isAdmin(user)) {
    return res.status(401).json({ error: "Only admins cand delete users" });
    }
  users.splice(users.indexOf(user), 1);
  return res.json(user);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUser({ email, password });
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    } else {
      if (user.password !== password) {
        return res.status(400).json({ error: "Password incorrect" });
      }

      const token = jwt.sign(
        { email: user.email, password: user.password },
        secretToken,
        { expiresIn: "1h" }
      );
      return res.status(202).json({ message: "Login success!", token });
    }
  } catch (error) {
    return res.status(401).json({ error: "Couldn't login" });
  }
};

const validateToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json({ error: "Access denied, token required" });
  }
  try {
    jwt.verify(token, secretToken, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      } else {
        next();
      }
    });
  } catch (error) {
    return res.status(401).json({ error: "Access denied" });
  }
};

module.exports = {
  createUser,
  findUser,
  updateUser,
  deleteUser,
  login,
  validateToken,
};
