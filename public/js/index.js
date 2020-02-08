// Get references to page elements
// var $gameText = $("#game-text");
// var $gameDescription = $("#game-description");
// var $submitBtn = $("#submit");
// var $gameList = $("#game-list");

// The API object contains methods for each kind of request we'll make
var API = {
  createGame: function(game) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/games",
      data: JSON.stringify(game)
    });
  },
  getGames: function() {
    return $.ajax({
      url: "api/games",
      type: "GET" // Check
    });
  },
  loadGame: function() {
    return $.ajax({
      url: "api/games" + id,
      type: "GET" // Check
    });
  },
  saveGame: function(game) {
    return $.ajax({
      url: "api/games",
      type: "PUT", // Check
      data: JSON.stringify(game)
    });
  },
  deleteGame: function(id) {
    return $.ajax({
      url: "api/games/" + id,
      type: "DELETE" // Check
    });
  },
  test: function() {
    console.log("test complete!")
  }
};

// refreshGames gets new games from the db and repopulates the list
// var refreshGames = function() {
//   API.getGames().then(function(data) {
//     var $games = data.map(function(game) {
//       var $a = $("<a>")
//         .text(game.text)
//         .attr("href", "/game/" + game.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": game.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $gameList.empty();
//     $gameList.append($games);
//   });
// };

// handleFormSubmit is called whenever we submit a new game
// Save the new game to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var game = {
//     text: $gameText.val().trim(),
//     description: $gameDescription.val().trim()
//   };

//   if (!(game.text && game.description)) {
//     alert("You must enter an game text and description!");
//     return;
//   }

//   API.createGame(game).then(function() {
//     refreshGames();
//   });

//   $gameText.val("");
//   $gameDescription.val("");
// };

// Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);

// module.exports = API;
