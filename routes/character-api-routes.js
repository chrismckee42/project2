var db = require("../models");

module.exports = function(app) {
  app.get("/api/characters", function(req, res) {
    db.Character.findAll({}).then(function(dbCharacters) {
      res.json(dbCharacters);
    });
  });

  app.get("/api/characters/:id", function(req, res) {
    db.Character.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbCharacter) {
      res.json(dbCharacter);
    });
  });

  app.post("/api/characters", function(req, res) {
    db.Character.create(req.body).then(function(dbCharacter) {
      res.json(dbCharacter);
    });
  });

  app.delete("/api/characters/:id", function(req, res) {
    db.Character.destroy({ where: { id: req.params.id } }).then(function(
      dbCharacter
    ) {
      res.json(dbCharacter);
    });
  });

  app.put("/api/characters", function(req, res) {
    db.Character.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};
