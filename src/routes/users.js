const { Router } = require("express");
const userController = require("../controllers/users");
const router = Router();

router.get("/", userController);
router.post("/", () => {});
router.put("/");
router.delete("/");

module.exports = router;
