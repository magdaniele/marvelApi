
const users = require('../models/users');

const findUser = (req, res) => {
  const { id } = req.params;
  const user = users.find(user => user.id === id);
  return res.json(user);
}
const createUser = (req, res) => {
  const { name, email } = req.body;
  const user = { id: users.length + 1, name, email };
  users.push(user);
  return res.json(user);
}
const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const user = users.find(user => user.id === id);
  user.name = name;
  user.email = email;
  return res.json(user);
}
const deleteUser = (req, res) => {
  const { id } = req.params;
  const user = users.find(user => user.id === id);
  users.splice(users.indexOf(user), 1);
  return res.json(user);
}
module.exports = {createUser, findUser, updateUser, deleteUser};