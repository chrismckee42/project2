var db = require("../models");

module.exports = function(app) {

  app.get("/api/games", function(req, res) {
    db.Game.findAll({}).then(function(dbGames) {
      res.json(dbGames);
    });
  });

  app.put("/api/prompt/", function(req, res) {
    console.log("req.body", req.body)
    db.Game.update(req.body, {
      // where: {
      //   id: req.body.id
      // }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });


  app.post("/api/games", function(req, res) {
    db.Game.create(req.body).then(function(dbGame) {
      res.json(dbGame);
    });
  });


  app.delete("/api/games/:id", function(req, res) {
    db.Game.destroy({ where: { id: req.params.id } }).then(function(dbGame) {
      res.json(dbGame);
    });
  });

  app.put("/api/games", function(req, res) {
    db.Game.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};
