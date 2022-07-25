const express = require("express");
const router = express.Router();
const { getHeroeInfo, getHeroesSearched, getHeroeSearchedByName, getHeroeSearchedByUsername } = require("../controllers/heroes");
// routes for heroes
router.get("/searchHeroe", getHeroeInfo);
router.get("/searchedHeroes",getHeroesSearched);
router.get("/userHeroes/:name",getHeroeSearchedByName);
router.get("/userHeroes/:username",getHeroeSearchedByName);

module.exports = router;
