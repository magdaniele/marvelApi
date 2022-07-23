const express = require("express");
const router = express.Router();
const { getHeroeInfo, getHeroesSearched, getHeroeSearchedByName } = require("../controllers/heroes");

router.get("/searchHeroe", getHeroeInfo);
router.get("/searchedHeroes",getHeroesSearched);
router.get("/userHeroes",getHeroeSearchedByName);

module.exports = router;
