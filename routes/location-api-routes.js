var db = require("../models");

module.exports = function(app) {
  app.get("/api/locations", function(req, res) {
    db.Location.findAll({}).then(function(dbLocations) {
      res.json(dbLocations);
    });
  });

  app.get("/api/locations/:x/:y", function(req, res) {
    db.Location.findOne({
      where: {
        x: req.params.x,
        y: req.params.y
      }
    }).then(function(dbLocation) {
      res.json(dbLocation);
    });
  });

  app.post("/api/locations", function(req, res) {
    db.Location.create(req.body).then(function(dbLocation) {
      res.json(dbLocation);
    });
  });

  app.delete("/api/locations/:id", function(req, res) {
    db.Location.destroy({ where: { id: req.params.id } }).then(function(
      dbLocation
    ) {
      res.json(dbLocation);
    });
  });

  app.put("/api/locations", function(req, res) {
    db.Location.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};
