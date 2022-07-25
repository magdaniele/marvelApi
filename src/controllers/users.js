const users = require("../database/models/users");
const lastLogin = require("../database/models/lastLogin");
const { getToken, isAdmin } = require("../middleware/authMiddleware");

const findUser = async (User) => { // Find user
  const { email } = User;
  const userFinded = await users.findOne({ email });
  return userFinded;
};

const createUser = async (req, res) => { // Create user
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
const updateUser = (req, res) => { // Update user
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

const deleteUser = (req, res) => { // Delete user
  const { id } = req.params;
  const user = users.find((user) => user.id === id);
  if (!isAdmin(user)) {
    return res.status(401).json({ error: "Only admins cand delete users" });
    }
  users.splice(users.indexOf(user), 1);
  return res.json(user);
};

const login = async (req, res) => { // Login user
  try {
    const { email, password } = req.body;
    const user = await findUser({ email, password });
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    } else {
      if (user.password !== password) {
        return res.status(400).json({ error: "Password incorrect" });
      }

      const token =  getToken(user);
      await lastLogin.create({usermane: user.username, loginDate: Date.now()}).then(() => {
        }).catch((error) => {
          return res.status(400).json({ error: "Couldn't create last login" });
        });

      return res.status(202).json({ message: "Login success!", token });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Couldn't login" });
  }
};

module.exports = {
  createUser,
  findUser,
  updateUser,
  deleteUser,
  login,
};
