const axios = require("axios").default;
const md5 = require("blueimp-md5");
const heroes = require("../database/models/heroes");
const { JWT_SECRET: secretToken } = process.env;
const jwt = require("jsonwebtoken");
const users = require("../database/models/users");
require("dotenv").config();

const { PUBLIC_KEY: publicKey, PRIVATE_KEY: privateKey } = process.env;

const getHeroeInfo = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const { name } = req.body;
    var email= await jwt.verify(token, secretToken).email;
    const user = await users.findOne({email});
    const idHeroe = await axios
      .get(
        `https://gateway.marvel.com/v1/public/characters?ts=${Date.now()}&apikey=${publicKey}&hash=${md5(
          Date.now() + privateKey + publicKey
        )}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          params: {
            name: name,
          },
        }
      )
      .then((response) => {
        return response.data.data.results[0].id;
      })
      .catch((error) => {
        return res.status(400).json({ error: "Heroe not found" });
      });

    const heroe = await axios
      .get(
        `https://gateway.marvel.com/v1/public/characters/${idHeroe}?ts=${Date.now()}&apikey=${publicKey}&hash=${md5(
          Date.now() + privateKey + publicKey
        )}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        return {
          name: response.data.data.results[0].name,
          description: response.data.data.results[0].description,
          picture:
            response.data.data.results[0].thumbnail.path +
            "." +
            response.data.data.results[0].thumbnail.extension,
          searcher: user.username,
          searchDate: Date(Date.now()),
        };
      })
      .catch((error) => {
        return res.status(400).json({ error: "Couldn't get the heroe info" });
      });
    await heroes.create(heroe);
    return res.status(200).json({ message: "Heroe finded!", heroe });
  } catch (error) {
    return res.status(400).json({ error: "Heroe not found" });
  }
};

const getHeroesSearched = async (req, res) => {
  try {
    const Heroes = await heroes.find();
    if (Heroes.length === 0) {
      return res.status(400).json({ error: "Heroes not found" });
        
    } else {
        return res.status(200).json({ message: "Heroes found!", Heroes });
    }
  } catch (error) {
    return res.status(400).json({ error: "Couldn't get the heroes" });
  }
};

const getHeroeSearchedByName = async (req, res) => {
    try {
        const { name } = req.params;
        const heroe = await heroes.find({name});
        if (!heroe) {
            return res.status(400).json({ error: "Hero has not been searched" });
        } else {
            return res.status(200).json({ message: "Searches found for this hero...", heroe });
        }
    } catch (error) {
        return res.status(400).json({ error: "Couldn't get the heroe" });
    }
}

const getHeroeSearchedByUsername = async (req, res) => {
    try {
        const { username } = req.params;
        const heroe = await heroes.find({searcher: username});
        if (!heroe) {
            return res.status(400).json({ error: "Hero has not been searched by "+username});
        } else {
            return res.status(200).json({ message: "Heroes that "+username+" has been searched..", heroe });
        }
    }
    catch (error) {
        return res.status(400).json({ error: "Couldn't get the heroe" });
    }
}
module.exports = { getHeroeInfo, getHeroesSearched, getHeroeSearchedByName, getHeroeSearchedByUsername };
