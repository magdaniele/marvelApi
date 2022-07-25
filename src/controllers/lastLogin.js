const LastLogin = require("../database/models/lastLogin");
const users = require("../database/models/users");
const { isAdmin, decodeToken } = require("../middleware/authMiddleware");

const getlastLoginByUser = async (req, res) => {
  // Get last login by user
  const { username } = req.params;
  const token = req.headers.authorization.split(' ').pop();
  const { email } = decodeToken(token);
  const user = await users.findOne({ email });
  if (!isAdmin(user)) return res.status(401).json({ error: "Access denied" });
  await LastLogin
    .find({ username })
    .sort({ loginDate: -1 })
    .limit(1)
    .then((lastLogin) => {
        return res.status(200).json({ lastLogin });
        }
    ).catch((error) => {
        return res.status(500).json({ error });
        }
    );

};

const getlastLogin = async (req, res) => {
  // Get last login
  const token = req.headers.authorization.split(' ').pop();
  const { email } = decodeToken(token);
  const user = await users.findOne({ email });
  if (!isAdmin(user)) return res.status(401).json({ error: "Access denied" });
  await LastLogin
    .find()
    .sort({ loginDate: -1 })
    .limit(1)
    .then((lastLogin) => {
        return res.status(200).json({ lastLogin });
        }
    ).catch((error) => {
        return res.status(500).json({ error });
        }
    );

};

module.exports = { getlastLogin, getlastLoginByUser };
