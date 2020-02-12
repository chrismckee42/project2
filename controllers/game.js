// Might be good to go - CB 1-15

// Inside the games_controller.js file, import the following:
// Express
var express = require("express");
var orm = require("../config/orm.js");
// game.js
// var game = require("../models/game.js");
var game = {
  all: function(cb) {
    orm.all("games", function(res) {
      cb(res);
    });
  },
  create: function(cols, vals, cb) {
    orm.create("games", cols, vals, function(res) {
      console.log("Do we get here?");
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("games", objColVals, condition, function(res) {
      cb(res);
    });
  }
};
// Create the router for the app...
var router = express.Router();

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    // console.log("res", Object.keys(res))
  game.all(function(data) {
      console.log({data})
    var hbsObject = {};
    // console.log(hbsObject);
    res.render("main", hbsObject);
  });
});

router.post("/api/games", function(req, res) {
  game.create(["game_name"], [req.body.name], function(result) {
    res.json({ id: result.insertId });
  });
});

router.put("/api/games/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  console.log("condition", condition);
  game.update(
    // {devoured: req.body.devoured},
    // condition,
    // function(result) {
    //   if (result.changedRows == 0) {
    //     // If no rows were changed, then the ID must not exist, so 404
    //     console.log("is our problem here?");
    //     return res.status(404).end();
    //   } else {
    //     res.status(200).end();
    //   }
    // }
  );
});

// router.delete("/api/cats/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   cat.delete(condition, function(result) {
//     if (result.affectedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

// ...and export the router at the end of your file.
module.exports = router;
