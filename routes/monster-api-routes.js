var db = require("../models");

module.exports = function(app) {
  app.get("/api/monsters", function(req, res) {
    db.Monster.findAll({}).then(function(dbMonsters) {
      res.json(dbMonsters);
    });
  });

  app.get("/api/monsters/:id", function(req, res) {
    db.Monster.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbMonster) {
      res.json(dbMonster);
    });
  });

  app.post("/api/monsters", function(req, res) {
    db.Monster.create(req.body).then(function(dbMonster) {
      res.json(dbMonster);
    });
  });

  app.delete("/api/monsters/:id", function(req, res) {
    db.Monster.destroy({ where: { id: req.params.id } }).then(function(
      dbMonster
    ) {
      res.json(dbMonster);
    });
  });

  app.put("/api/monsters", function(req, res) {
    db.Monster.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};
