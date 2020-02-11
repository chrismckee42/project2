// The API object contains methods for each kind of request we'll make
var API = {
  createGame: function(game) {
    /* input should be in the form:
    {
      name,
      role,
      hp,
      hpMax,
      attack,
      dodge
    };
    */
    return $.ajax({
      headers: {
        'Content-Type': 'application/json'
      },
      type: 'POST',
      url: 'api/games',
      data: JSON.stringify(game)
    });
  },
  getGames: function() {
    return $.ajax({
      url: 'api/games',
      type: 'GET' // Check
    });
  },
  loadGame: function() {
    return $.ajax({
      url: 'api/games/' + id,
      type: 'GET' // Check
    });
  },
  saveGame: function(game) {
    /* input should be in the form:
    {
      name,
      role,
      location,
      hp,
      hpMax,
      attack,
      dodge,
      gold,
      potions,
      monster1HP,
      monster2HP,
      monster3HP,
      monster4HP,
      treasure1Found,
      treasure2Found,
      treasure3Found,
      treasure4Found,
      treasure5Found,
      treasure1Sold,
      treasure2Sold,
      treasure3Sold,
      treasure4Sold,
      treasure5Sold
    };
    */
    return $.ajax({
      url: 'api/games',
      type: 'PUT', // Check
      data: JSON.stringify(game)
    });
  },
  deleteGame: function(id) {
    return $.ajax({
      url: 'api/games/' + id,
      type: 'DELETE' // Check
    });
  },
  test: function() {
    console.log('test complete!')
  }
};

module.exports = API;
