var db = require("../models");

const roles = ["barb", "druid", "rogue"];
const stats = {
  //0 : hp, 1: atk, 2: dodge chance (x = x/10 times a strike will mss)
  barb: [100, 15, 1],
  druid: [80, 12, 4],
  rogue: [50, 8, 6]
};

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Game.findAll({}).then(function(dbGames) {
      res.render("index", {
        msg: "Welcome!",
        games: dbGames
      });
    });
  });

  // Load game page and pass in an game by id
  app.get("/game/:id", function(req, res) {
    db.Game.findOne({ where: { id: req.params.id } }).then(function(dbGame) {
      res.render("game", {
        game: dbGame
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};