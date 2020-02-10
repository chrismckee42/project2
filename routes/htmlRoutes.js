var db = require("../models");
// var storyBoard = require("../js/storyBoard.js");

//do i keep storyboard on the server side or do I try to figure out how tf to use handlebars on the client side....
module.exports = function(app) {
  // on page start ask start game or continue game
  app.get("/", function(req, res) {
    // const { startOrContinue } = req.body;
    console.log(req.query)
    const handlebarsObj =  {
      type: "list",
      message: "Welcome to Adventure Game. Please select start",
      choices: ["Start Game", "Continue Game"],
      name: "pick role",
      monster: null,
      background: "./img/tiles/town.jpg",
      name: "startOrContinue"
    };
    handlebarsObj.type = handlebarsObj.type === "list" ? true : false;
    db.Game.findAll({}).then(function(dbGames) {
      // console.log({ dbGames });
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
