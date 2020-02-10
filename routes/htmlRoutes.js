var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    const { body: {name} } = req;
    const handlebarsObj = name ? name : {
        type: "list",
        message: "Please select your character role:",
        // choices: ["Barb", "Druid", "Rogue"],
        name: "pick role",
        monster: "./img/monsters/owlbear.png",
        background: "./img/tiles/town.jpg",
        name: "choose role"
      };
    handlebarsObj.type = handlebarsObj.type === "list" ? true : false;
    db.Game.findAll({}).then(function(dbGames) {
      console.log({ dbGames });
      res.render("index", handlebarsObj);
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
