// Get references to page elements
var $gameText = $("#game-text");
var $gameDescription = $("#game-description");
var $submitBtn = $("#submit");
var $gameList = $("#game-list");

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
  deleteGame: function(id) {
    return $.ajax({
      url: "api/games/" + id,
      type: "DELETE" // Check
    });
  }
};

// refreshGames gets new games from the db and repopulates the list
var refreshGames = function() {
  API.getGames().then(function(data) {
    var $games = data.map(function(game) {
      var $a = $("<a>")
        .text(game.text)
        .attr("href", "/game/" + game.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": game.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $gameList.empty();
    $gameList.append($games);
  });
};

// handleFormSubmit is called whenever we submit a new game
// Save the new game to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var game = {
    text: $gameText.val().trim(),
    description: $gameDescription.val().trim()
  };

  if (!(game.text && game.description)) {
    alert("You must enter an game text and description!");
    return;
  }

  API.saveGame(game).then(function() {
    refreshGames();
  });

  $gameText.val("");
  $gameDescription.val("");
};

// handleDeleteBtnClick is called when an game's delete button is clicked
// Remove the game from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteGame(idToDelete).then(function() {
    refreshGames();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$gameList.on("click", ".delete", handleDeleteBtnClick);
