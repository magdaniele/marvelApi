const { Router } = require("express");
const userController = require("../controllers/users");
const router = Router();

router.get("/login", userController.login);
router.post("/signUp", userController.createUser);
router.get("/home",userController.validateToken, (req, res) => {
    res.send("Hello world!");});
router.put("/update",userController.validateToken, userController.updateUser);
router.delete("/");

module.exports = router;
