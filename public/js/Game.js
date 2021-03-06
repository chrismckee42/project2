const roles = require("./roles");

class Game {
  constructor({ selectedRole, playerCoords, inventory, name }) {
    this.count = 0
    this.roleSelected = selectedRole;
    playerCoords = playerCoords > 0 && playerCoords < 10 ? playerCoords : 5
    this.playerCoords = 5;
    this.tiles = [
      ["Swamp", "Field", "Abandoned Fort"],
      ["Forest", "Town", "Farm"],
      ["Dark Cave", "Rolling Hills", "Mountains"]
    ];
    this.name = name ? name : false;
    let { hp, atk, dodge } = roles[selectedRole];
    this._stats = { hp, atk, dodge, maxHP: hp }; //0 : hp, 1: atk, 2: dodge chance (x = x/10 times a strike will mss)
    this._inventory = inventory
      ? inventory
      : {
        gold: 16,
        treasure: [
          // 0: name, 1: amount,  2: location id, 3: still at location,
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
    console.log("PLAYER COORDS" , this.playerCoords)
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
    console.log('ID', id)
    let [y, x] = this.location[id];
    
    console.log('b')
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
    console.log({ locationData });
    return locationData;
  }
  upgrade({ hp, maxHP, atk, dodge, gold }) {
    if (gold) {
      gold = gold < 0 ? gold : -gold;
      if (gold > this.gold) {
        return false;
      } else {
        this.gold -= gold;
      }
    }
    if (hp) {
      this.maxHP += hp;
    }
    if (maxHP) {
      this.maxHP += maxHP;
    }
    if (atk) {
      this.atk += atk;
    }
    if (dodge) {
      this.dodge += dodge;
    }
    return true;
  }
  createMesage() {
    return;
  }
  saveGame() {
    //run every time you want to save the game
  }
  updateCoords(nsew, loc) {
    loc = loc.slice(1)
    const {tiles} = this
    let y = tiles.reduce((acc, row, i) => row.indexOf(loc) > -1 ? i : acc, null)
    let x = tiles[y].indexOf(loc);
//     this.count++
//     console.log('-------------------------------------------------')
//     let [y, x] = this.location[this.playerCoords];
//     if (this.count % 2 === 0) {
//       console.log(this.count)
//       console.log(nsew,)
//       console.log([x, y])
//       if (nsew === "north") {
//         [x, y] = [x, y - 1];
//       }
//       if (nsew === "south") {
//         [x, y] = [x, y + 1];
//       }
//       if (nsew === "east") {
//         [x, y] = [x + 1, y];
//       }
//       if (nsew === "west") {
//         [x, y] = [x - 1, y];
//       }
//     }
//     x = x > 2 ? 2 : x < 0 ? 0 : x;
//     y = y > 2 ? 2 : y < 0 ? 0 : x;
// console.log()
//     // console.log({x, y})
//     console.log(this.playerCoords, "<-------------------")
//     console.log([x, y])
    this.playerCoords = this.location.reduce(
      (acc, cur, i) => (cur[1] === x && cur[0] === y ? i : acc),
      null
    );
//     console.log(this.playerCoords, "<-------------------")
  }
}

module.exports = Game;

// function newGame(name, role) {
//   return {
//     name,
//     role,
//     hp: stats[role][0],
//     hpMax: stats[role][0],
//     attack: stats[role][1],
//     dodge: stats[role][2]
//   };
//let i = roles.indexOf(role)
// var myGame = new Game(
//   name, //name
//   role, //role
//   5, //location
//   stats[role][0], //hp
//   stats[role][0], //hpMax
//   stats[role][1], //attack
//   stats[role][2], //dodge
//   0, //gold
//   0, //potions
//   30, //monster1HP
//   50, //monster2HP
//   60, //monster3HP
//   100, //monster4HP
//   false, //treasure1Found
//   false, //treasure2Found
//   false, //treasure3Found
//   false, //treasure4Found
//   false, //treasure5Found
//   false, //treasure1Sold
//   false, //treasure2Sold
//   false, //treasure3Sold
//   false, //treasure4Sold
//   false //treasure5Sold
// )
// }

// function loadGame(gameObj) {
//   return new Game(
//     gameObj.name,
//     gameObj.role,
//     gameObj.location,
//     gameObj.hp,
//     gameObj.hpMax,
//     gameObj.attack,
//     gameObj.dodge,
//     gameObj.gold,
//     gameObj.potions,
//     gameObj.monster1HP,
//     gameObj.monster2HP,
//     gameObj.monster3HP,
//     gameObj.monster4HP,
//     gameObj.treasure1Found,
//     gameObj.treasure2Found,
//     gameObj.treasure3Found,
//     gameObj.treasure4Found,
//     gameObj.treasure5Found,
//     gameObj.treasure1Sold,
//     gameObj.treasure2Sold,
//     gameObj.treasure3Sold,
//     gameObj.treasure4Sold,
//     gameObj.treasure5Sold
//   );
// }

//test:
// const newGame = new Game("rouge");
// console.log(newGame.locationData);
