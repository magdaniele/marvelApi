const users = require("../database/models/users");
const { JWT_SECRET: secretToken } = process.env;
const jwt = require("jsonwebtoken");

const findUser = async (User) => {
  const { email } = User;
  const userFinded = await users.findOne({ email });
  return userFinded;
};
const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const user = { name, email, password };

    if (
      name === "" ||
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
    return res.status(200).json({ success: "User created successfully!" });
  } catch (error) {
    next(error);
  }
};
const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const user = users.find((user) => user.id === id);
  user.name = name;
  user.email = email;
  return res.json(user);
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);
  users.splice(users.indexOf(user), 1);
  return res.json(user);
};

const login = async (req, res) => {
  const { email, password } = req.body;
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
    return res.json({ token });
  }
};

const validateToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json({ error: "Access denied" });
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
