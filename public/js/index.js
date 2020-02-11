// The API object contains methods for each kind of request we'll make
const roles = {
    //0 : hp, 1: atk, 2: dodge chance (x = x/10 times a strike will mss)
    barb: [100, 15, 1],
    druid: [80, 12, 4],
    rogue: [50, 8, 6],
};

var API = {
    createGame: function(name, role) {
        let game = {
            name,
            role,
            hp: roles[role][0],
            hpMax: roles[role][0],
            attack: roles[role][1],
            dodge: roles[role][2],
        };

        return $.ajax({
            headers: {
                'Content-Type': 'application/json',
            },
            type: 'POST',
            url: 'api/games',
            data: JSON.stringify(game),
        });
    },
    getGames: function() {
        return $.ajax({
            url: 'api/games',
            type: 'GET', // Check
        });
    },
    loadGame: function() {
        return $.ajax({
            url: 'api/games/' + id,
            type: 'GET', // Check
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
            data: JSON.stringify(game),
        });
    },
    deleteGame: function(id) {
        return $.ajax({
            url: 'api/games/' + id,
            type: 'DELETE', // Check
        });
    },
    test: function() {
        console.log('test complete!');
    },
};

module.exports = API;
