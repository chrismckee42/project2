var db = require("../models");
var storyBoard = require("../public/js/storyBoard3.js");
let storage = {}
//do i keep storyboard on the server side or do I try to figure out how tf to use handlebars on the client side....
module.exports = function(app) {
  // on page start ask start game or continue game
  let name = 'init';
  let response = 'startNewOrContinue';
  app.get("/", function(req, res) {
    // const { startOrContinue } = req.body;
    [name, response] = req.query.name ? [req.query.name, req.query.response] : [name, response];
    storage[name] = response;
    console.log({storage})
    const handlebarsObj = storyBoard({name, response});
    console.log({handlebarsObj});

    if (storage['pick name'] && storage['pick role']){
      //game has been initialized and should be saved.
    }

    if ('startNewOrContinue' === 'Continue Game'){
      //database should be queried and return results for existing games
    }

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
