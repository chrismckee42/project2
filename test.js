class Game {
  constructor(role) {
    this.playerCoords = 5;
    this.tiles = [
      ["Swamp", "Field", "Abandoned Fort"],
      ["Forest", "Town", "Farm"],
      ["Dark Cave", "Rolling Hills", "Mountains"]
    ];
    this.roleSelected = role;
    this.inventory = {
      gold: 0,
      treasure: [
        // 0: name, 1: amount,  2: location id, 3: still at location,
        ["Emerald Knife", 20, 7, true],
        ["Jeweled Crown", 50, 9, true],
        ["Bag of Copper Coins", 5, 2, true],
        ["Silver Chalice", 50, 1, true],
        ["Chest of loot", 100, 4, true]
      ]
    };
    this.monsters = [
      //name, hp, attack, location id, isAlive
      ["troll", 10, 3, 1, true],
      ["Goblin", 3, 1, 8, true],
      ["OwlBear", 6, 2, 4, true],
      ["Bandit", 5, 2, 3, true]
    ];
  }
  CanMoveNSEW() {}
  get locationData() {
    let id = this.playerCoords;
    //[1, 2, 3]
    //[4, 5, 6]
    //[7, 8, 9]
    let location = {
      1: [0, 0],
      2: [0, 1],
      3: [0, 2],
      4: [1, 0],
      5: [1, 1],
      6: [1, 2],
      7: [2, 0],
      8: [2, 1],
      9: [2, 2]
    };

    let [x, y] = location[id];
    let locationData = {
      coords: [x, y],
      monster:
        this.monsters.filter(monster => monster[3] === id).length > 0
          ? this.monsters.filter(monster => monster[3] === id)
          : false,
      treasure:
        this.inventory.treasure.filter(monster => monster[2] === id).length > 0
          ? this.monsters.filter(monster => monster[2] === id)
          : false,

      north: this.tiles[x][y - 1] || false,
      south: this.tiles[x][y + 1] || false,
      east: this.tiles[x - 1][y] || false,
      west: this.tiles[x + 1][y] || false
    };
    return locationData;
  }
}

const newGame = new Game("rouge");

console.log(newGame.locationData);
