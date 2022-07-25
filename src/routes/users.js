const { Router } = require("express");
const router = Router();
const heroesRouter = require("./heroes");
const lastLoginRouter = require("./lastLogin");
const {login, createUser, updateUser, deleteUser} = require("../controllers/users");
const { validateToken } = require("../middleware/authMiddleware");

// routes for users
router.get("/login", login);
router.post("/signUp", createUser);
router.use("/",validateToken, heroesRouter);
router.use("/", lastLoginRouter);
router.put("/:id",validateToken, updateUser);
router.delete("/:id",validateToken, deleteUser);

module.exports = router;
