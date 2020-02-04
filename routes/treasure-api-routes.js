var db = require("../models");

module.exports = function(app) {
  app.get("/api/treasures", function(req, res) {
    db.Treasure.findAll({}).then(function(dbTreasures) {
      res.json(dbTreasures);
    });
  });

  app.get("/api/treasures/:id", function(req, res) {
    db.Treasure.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbTreasure) {
      res.json(dbTreasure);
    });
  });

  app.post("/api/treasures", function(req, res) {
    db.Treasure.create(req.body).then(function(dbTreasure) {
      res.json(dbTreasure);
    });
  });

  app.delete("/api/treasures/:id", function(req, res) {
    db.Treasure.destroy({ where: { id: req.params.id } }).then(function(
      dbTreasure
    ) {
      res.json(dbTreasure);
    });
  });

  app.put("/api/treasures", function(req, res) {
    db.Treasure.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};
