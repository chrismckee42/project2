const roles = require("./roles");

class Game {
  constructor({role, playerCoords, inventory, name}) {
    this.playerCoords = playerCoords ? playerCoords : 5;
    this.tiles = [
      ["Swamp", "Field", "Abandoned Fort"],
      ["Forest", "Town", "Farm"],
      ["Dark Cave", "Rolling Hills", "Mountains"]
    ];
    this.roleSelected = role;
    this.name = name ? name : false;
    let { hp, atk, dodge } = roles[role];
    this._stats = { hp, atk, dodge, maxHP: hp }; //0 : hp, 1: atk, 2: dodge chance (x = x/10 times a strike will mss)
    this._inventory = inventory ? inventory: {
      gold: 16,
      treasure: [// 0: name, 1: amount,  2: location id, 3: still at location,
        ["Emerald Knife", 20, 7, true],
        ["Jeweled Crown", 50, 9, true],
        ["Bag of Copper Coins", 5, 2, true],
        ["Silver Chalice", 50, 1, true],
        ["Chest of loot", 100, 4, true]
      ],
      healthPotions: 0, // 0: quantity in inventory: 1: amount healed
      treasureInPosession: []
    };
    this.monsters = [
      //0: name, 1: hp,2: attack, 3: location id, 4: isAlive
      ["Goblin", 30, 10, 8, true],
      ["Bandit", 50, 20, 3, true],
      ["OwlBear", 60, 20, 4, true],
      ["troll", 100, 30, 1, true]
    ];
    //[1, 2, 3]
    //[4, 5, 6]
    //[7, 8, 9]
    this.location = [
      [NaN, NaN],
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 1],
      [1, 2],
      [2, 0],
      [2, 1],
      [2, 2]
    ];
  }
  get inventory() {
    let { gold, healthPotions, treasureInPosession } = this._inventory;
    treasureInPosession =
      treasureInPosession.length > 0 ? treasureInPosession.join(", ") : "none";
    return { gold, healthPotions, treasureInPosession };
  }
  get stats() {
    let { hp, atk, dodge, maxHP } = this._stats;
    return { hp, atk, dodge, maxHP };
  }
  sleep() {
    this._stats.hp = this._stats.maxHP;
  }
  get locationData() {
    let id = this.playerCoords;
    let [y, x] = this.location[id];
    let locationData = {
      coords: [x, y],
      currentLocation: this.tiles[y][x],
      directions: {
        north: y === 0 ? false : this.tiles[y - 1][x],
        south: y === 2 ? false : this.tiles[y + 1][x],
        east: x === 2 ? false : this.tiles[y][x + 1],
        west: x === 0 ? false : this.tiles[y][x - 1]
      },
      monster:
        this.monsters.filter(monster => monster[3] === id).length > 0
          ? this.monsters.filter(monster => monster[3] === id)[0]
          : false,
      treasure:
        this._inventory.treasure.filter(treasure => treasure[2] === id).length >
        0
          ? this._inventory.treasure.filter(treasure => treasure[2] === id)[0]
          : false
    };
    // console.log({locationData})
    return locationData;
  }
  upgrade({hp, maxHP, atk, dodge, gold}){
    if (gold){
      gold = gold < 0 ? gold : -gold;
      if (gold > this.gold) return false;
      else this.gold -= gold;
    }
    if (hp) {
      this.maxHP += hp;
    }
    if (maxHP){
      this.maxHP += maxHP
    }
    if (atk){
      this.atk += atk;
    }
    if (dodge){
      this.dodge += dodge
    }
    return true;
  }
  createMesage() {
    return;
  }
  saveGame() {
    //run every time you want to save the game
  }
  updateCoords(nsew) {
    let [y, x] = this.location[this.playerCoords];
    if (nsew === "north") {
      [x, y] = [x, y - 1];
    }
    if (nsew === "south") {
      [x, y] = [x, y + 1];
    }
    if (nsew === "east") {
      [x, y] = [x + 1, y];
    }
    if (nsew === "west") {
      [x, y] = [x - 1, y];
    }
    // console.log({x, y})
    this.playerCoords = this.location.reduce(
      (acc, cur, i) => (cur[1] === x && cur[0] === y ? i : acc),
      null
    );
  }
}

module.exports = Game;
