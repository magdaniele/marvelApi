const { Router } = require("express");
const router = Router();
const heroesRouter = require("./heroes");
const {login, createUser, validateToken,updateUser, deleteUser} = require("../controllers/users");

router.get("/login", login);
router.post("/signUp", createUser);
router.use("/home",validateToken, heroesRouter);
router.put("/update",validateToken, updateUser);
router.delete("/",validateToken, deleteUser);

module.exports = router;
