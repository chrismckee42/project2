//run with 'node ./public/js/inquirer'
const inquirer = require("inquirer");
const inquirerClone = {
  
  const  prompt = async ({name, message, type, choices, validate}) => {
        if (!type) throw 'Error: type needed';
    
        if (type === 'list'){
            if (!choices) throw 'Error: choices needed for list';
            if (typeof choices[0] === 'array')
            if (typeof choices[0] === 'object')
                if (!choices[0].name) throw 'Error: choices.name invalid';
                if (choices[0].value)
        }
        if (type === 'input') {
            //there's three main areas
            //message
    
    
            //choices / input
                //choices : render buttons for each available choice
                //input : render an input form and text box: 
        }
        if (validate)
        $.ajax("/api/userPrompt/" + id, {
          type: "PUT",
          data: response
        }).then(function() {
          console.log("changed devoured to", newDevoured);
          // Reload the page to get the updated list
          location.reload();
        });

      }
    


    return {prompt};
}


const init = async () => {
  const roles = ["barb", "druid", "rogue"];
  const stats = {
    //0 : hp, 1: atk, 2: dodge chance (x = x/10 times a strike will mss)
    barb: [100, 15, 1],
    druid: [80, 12, 4],
    rogue: [50, 8, 6]
  };

  const savedGames = {};

  class Game {
    constructor(role, playerCoords, inventory, monsters) {
      this.playerCoords = playerCoords ? playerCoords : 5;
      this.tiles = [
        ["Swamp", "Field", "Abandoned Fort"],
        ["Forest", "Town", "Farm"],
        ["Dark Cave", "Rolling Hills", "Mountains"]
      ];
      this.roleSelected = role;
      let [hp, atk, dodge] = stats[role];
      this._stats = {hp, atk, dodge, fullHealth: hp}; //0 : hp, 1: atk, 2: dodge chance (x = x/10 times a strike will mss)
      this._inventory = inventory ? inventory : {
        gold: 16,
        treasure: [
          // 0: name, 1: amount,  2: location id, 3: still at location,
          ["Emerald Knife", 20, 7, true],
          ["Jeweled Crown", 50, 9, true],
          ["Bag of Copper Coins", 5, 2, true],
          ["Silver Chalice", 50, 1, true],
          ["Chest of loot", 100, 4, true]
        ],
        healthPotions: 0,// 0: quantity in inventory: 1: amount healed
        treasureInPosession: [],
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
      let {gold, healthPotions, treasureInPosession} = this._inventory
      treasureInPosession = treasureInPosession.length > 0 ? treasureInPosession.join(", ") : "none";
      return {gold, healthPotions, treasureInPosession};
    }
    get stats() {
      let {hp, atk, dodge, fullHealth} = this._stats;
      return {hp, atk, dodge, fullHealth};
    }
    sleep(){
      this._stats.hp = this._stats.fullHealth;
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
        monster :
        this.monsters.filter(monster => monster[3] === id).length > 0 ? this.monsters.filter(monster => monster[3] === id)[0] : false,
        treasure :
          this._inventory.treasure.filter(treasure => treasure[2] === id)
            .length > 0
            ? this._inventory.treasure.filter(treasure => treasure[2] === id)[0]
            : false,
      };
      // console.log({locationData})
      return locationData;
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

  //test:
  // const newGame = new Game("rouge");
  // console.log(newGame.locationData);

  //init
  const { prompt } = inquirer;
  const type = "list";
  const { startGame } = await prompt({
    type,
    message: "Welcome to Adventure Game. Press start to continue.",
    choices: [{ name: "start", value: true }],
    name: "startGame"
  });

  console.log("start game:", startGame);

  const continueSavedGameOrCreateNewGame = async function() {
    const { continueOrNewGame } = await prompt({
      type,
      message: "Would you like to start a new game or continue a saved game?",
      choices: ["Start New Game", "Continue Saved Game"],
      name: "continueOrNewGame"
    });

    // create new game
    if (continueOrNewGame === "Start New Game") {
      const { name } = await prompt({
        type: "input",
        message: "Please enter your character's name:",
        name: "name",
        validate: name => name.length >= 3 && name.length < 45
      });

      const { role } = await prompt({
        type,
        message: "Please select your character role:",
        choices: roles,
        name: "role"
      });

      savedGames[name] = new Game(role);
      return name;
    }
    console.log("continue or new game:", continueOrNewGame);
    if (continueOrNewGame === "Continue Saved Game") {
      // if there are no saved games
      let keys = Object.keys(savedGames);
      if (!keys[0]) {
        console.log("There are no saved games.");
        continueSavedGameOrCreateNewGame();
      } else {
        const { name } = await prompt({
          type,
          choices: keys,
          message: "Please choose your character's name",
          name: "game"
        });
        return name;
      }
    }
  };

  let name = startGame ? await continueSavedGameOrCreateNewGame() : null;
  let game = savedGames[name];

  const theFunctionThatLoopsTheGameOverAndFuckingOver = async function(lastDirection){
    const { currentLocation, monster, treasure } = game.locationData;
    // eslint-disable-next-line prettier/prettier
    let ifTraveled = lastDirection ? `You travel ${lastDirection} to the ${currentLocation}. ` : "";
    let planB = Array(4).fill(null);
    let [monsterName, hp, atk, monsterIsAlive] = monster || planB;
    let [treasureName, , , treasureIsAvailable] = treasure || planB;

    let promptList = {
      town: {
        // eslint-disable-next-line prettier/prettier
        message: `${ifTraveled ? ifTraveled + "Welcome back" : "Welcome"} to town! Here you will be able to sell treasure, buy health potions, heal at the inn, or upgrade weapons and armor at the blacksmith.`,
        // eslint-disable-next-line prettier/prettier
        choices: ["Check Inventory", "Check my own stats", "Travel", "Go to Inn", "Go to Apothecary", "Go to Blacksmith", "Go to Appraiser"],
      },
      monsterIsAlive: {
        message:`${ifTraveled}You made it to ${currentLocation}. Oh no, it's a ${monsterName} with ${atk} attack, and ${hp} hp. ${
          // eslint-disable-next-line prettier/prettier
          treasureIsAvailable ? `It seems to be guarding a ${treasureName}. ` : ""
        } What do you want to do?`,
        // eslint-disable-next-line prettier/prettier
        choices: ["Check my own stats", "Attack monster", "Run Away", "Check inventory for health potions"]
      },
      treasureIsAvailable: {
        // eslint-disable-next-line prettier/prettier
        message: `${ifTraveled}${monsterName && !monsterIsAlive ? `There appears to be a dead ${monsterName}. You must've killed it. ` : ""}Well there appears to be some treasure. A ${treasureName} by the looks of it. What do you want to do?`,
        choices: ["Run Away", "Take treasure"]
      },
      treasureTook: {
        // eslint-disable-next-line prettier/prettier
        message: `${ifTraveled}You took the ${treasureName}. ${monsterName && !monsterIsAlive ? `I guess the ${monsterName} won't be needing it. ` : ""}Where to now?`,
        // eslint-disable-next-line prettier/prettier
        choices: ["Travel", "Check inventory", "Check my own stats", "Check inventory for health potions"]
      },
      nothingSpecial: {
        message: `${ifTraveled}Doesn't seem like anything's here...`,
        choices:  ["Travel", "Check inventory", "Check my own stats", "Check inventory for health potions"]
      },
      navigate: {
        message: "",
        choices: []
      }
    };
    // eslint-disable-next-line prettier/prettier
    const selection = currentLocation === "Town" ? "town" : monsterIsAlive ?"monsterIsAlive" : treasureIsAvailable? "treasureIsAvailable" :"nothingSpecial";
    const { message, choices } = promptList[selection];
    const responseTo = {
      "Check Inventory" : () => {
        const { gold, healthPotions, treasureInPosession } = game.inventory;
        console.log(`Gold: $${gold}`);
        console.log(`Health Potions: ${healthPotions}`);
        console.log(`Treasure: ${treasureInPosession}`);
        // console.log("inventory is not set up yet");
        theFunctionThatLoopsTheGameOverAndFuckingOver()
      },
      "Travel" : async () => {
        const {directions: nsew} = game.locationData;
        const choices = Object.keys(nsew).map(direction => ({
          name: `${direction}:  ${nsew[direction]}`,
          disabled: !nsew[direction]
        }));
        choices.push("Cancel");
        let {direction} = await prompt({
          type,
          choices,
          message: "Which direction do you want to travel?",
          name: "direction"
        });
        direction = direction.split(": ");
        if (direction === "Cancel"){
          theFunctionThatLoopsTheGameOverAndFuckingOver();
        } else {
          const [newNSEW] = direction;
          game.updateCoords(newNSEW);
          theFunctionThatLoopsTheGameOverAndFuckingOver(newNSEW);
        }
      },
      "Go to Inn": async () => {
        const { hp, fullHealth } = game.stats;
        let couldUseRest = fullHealth - hp > 0;
        const response = await prompt({
          type,
          // eslint-disable-next-line prettier/prettier
          message: `${ couldUseRest ? "Some Zzz's might help with those bruises. " : "" } Would you like to rest a bit?`,
          choices: ["Yes", "No"],
          name: "response"
        });
        if (response === "Yes") {
          game.sleep();
        }
        console.log("Come back any time.");
        theFunctionThatLoopsTheGameOverAndFuckingOver();
      },
      "Go to Apothecary": async () => {
        let price = 5;
        let { gold, healthPotions } = game.inventory;
        // eslint-disable-next-line prettier/prettier
        let maxPurchase = 4
        maxPurchase -= healthPotions;
        maxPurchase = (gold / price) < maxPurchase ? (gold / price).toFixed() : maxPurchase;
        let message = gold < price ? `Come back when you have more money.` : `${healthPotions < 1 ? `You're all out of health potions. ` : ''}I can sell you up to ${maxPurchase} health potions. `;
        let choiceArray = []
        if (maxPurchase > 0){
          let arr = Array(parseInt(maxPurchase)).fill(0)
          arr.forEach((a, i) => choiceArray.push(`Buy ${i+1} health potions.`))
        }
        choiceArray.push('Leave store.');
        let { quantity } = await prompt({type, message, choices: choiceArray, name: 'quantity'});
        quantity = parseInt(quantity.split(' ')[1]);
        if (isNaN(quantity)) {
          console.log('Come back soon! And with more money!');
        } else {
          game._inventory.healthPotions += quantity
          game._inventory.gold -= price * quantity
          console.log(`You now have ${game._inventory.healthPotions} health potions.`)
        }
        theFunctionThatLoopsTheGameOverAndFuckingOver();
        return;
      },
      "Go to Blacksmith": async () => {
        let { hp, atk, dodge, fullHealth } = game._stats;
        let { gold, healthPotions, treasureInPosession } = game._inventory;
        const { item } = await prompt({
          type,
          message: `Welcome to the blacksmith, ${this.role}! Here we can upgrade those weak stats of yours. What would you like to upgrade?`,
          choices: ['$15: Boots (+5% dodge)', '$20: Weapon (+5 atk)', '$30: Helmet (+10 max hp)', 'Leave Store.'],
          name: 'item'
        });
        const choose = {
          '$15: Boots (+5% dodge)' : () => {
            if (gold > 15) {
              gold -= 15;
              game._inventory.gold = gold;
              dodge += .5
              game._stats.dodge = dodge;
              console.log(`You upgraded your boots! Your balance: $${gold}, Your dodge is now %${(dodge * 10).toFixed()}.`)

            } else {
              console.log(`You only have $${gold}. You need $15.`);
            };
            responseTo["Go to Blacksmith"]();
          },
          '$20: Weapon (+5 atk)' : () => {
            if (gold > 20) {
              gold -= 20;
              game._inventory.gold = gold;
              atk += 5;
              game._stats.atk = atk;
              console.log(`You upgraded your weapon! Your balance: $${gold}, Your attack is now ${atk}.`)
            } else {
              console.log(`You only have $${gold}. You need $20.`);
            }
            responseTo["Go to Blacksmith"]();
          },
          '$30: Helmet (+10 max hp)' : () => {
            if (gold > 30) {
              gold -= 30;
              game._inventory.gold = gold;
              fullHealth += 10;
              game._stats.fullHealth = fullHealth;
              console.log(`You upgraded your helmet! Your balance: $${gold}, Your max hp is now ${fullHealth}.`);
            } else {
              console.log(`You only have $${gold}. You need $30.`);
            }
            responseTo["Go to Blacksmith"]();
          },
          'Leave Store.' : () => {
            console.log(`Come back soon!`);
            theFunctionThatLoopsTheGameOverAndFuckingOver();
          }
        }
        choose[item]();
        return;
      },
      "Go to Appraiser": async () => {
        let posessions = game._inventory.treasureInPosession;
        if (posessions.length > 0) {
          let {item} = await prompt({
            type,
            message: `Oh that looks like some nice stuff you have. Give it to me and I'll give you gold.`,
            choices: posessions,
            name: 'item'
          })
          let treasureID = game._inventory.treasure.reduce((acc, cur, i) => cur[0] === item ? i : acc, null)
          let price = game._inventory.treasure[treasureID][1]
          let {confirm} = await prompt({
            type,
            message: `Hey, that's a nice ${item}! I'll here's $${price} for your trouble. Whadda ya say?`,
            choices: ['okay...'],
            name: 'confirm'
          })
          if (confirm){
            let idx = game._inventory.treasureInPosession.indexOf(item);
            game._inventory.treasureInPosession.splice(item, 1);
            game._inventory.gold += price
            console.log(`$${price} has now been added to your gold. You should go to the blacksmith and improve your attributes.`)
            theFunctionThatLoopsTheGameOverAndFuckingOver()
          }
        } else {
          let {confirm} = await prompt({
            type,
            message: `Doesnt look like you have any treasure... why dont you go look for some?`,
            choices: ['okay...'],
            name: 'confirm'
          })
          theFunctionThatLoopsTheGameOverAndFuckingOver()
        }
        return;
      },
      "Check my own stats": () => {
        const { hp, atk, dodge, fullHealth } = game.stats;
        console.log(`Your health is ${hp}/${fullHealth}.`)
        console.log(`Your attack damage is ${atk}.`)
        console.log(`Your dodge chance is ${(dodge * 10).toFixed()}%.`);
        return theFunctionThatLoopsTheGameOverAndFuckingOver()
      },
      "Attack monster": () => {
        //    let [monsterName, hp, atk, monsterIsAlive] = monster || planB;
        let { hp, atk, dodge, fullHealth } = game.stats;
        let [monsterName, monsterHP, monsterATK] = monster;
        let monsterID = game.monsters.reduce((acc, cur, i) => cur[0] === monsterName ? i : acc, null)
        monsterHP -= atk;
        let message = `You attack the monster for ${atk} damage. Its health drops to ${monsterHP}.`
        let didjaDodge = Math.random()*10 <= dodge;
        if (didjaDodge && monsterHP > 0) {
          console.log(`${message} The ${monsterName} attacked you, but you dodged the attack!`)
        } else if (monsterHP > 0) {
          hp -= monsterATK;
          game._stats.hp = hp;
          console.log(`${message} The ${monsterName} attacked you. Your health is now ${hp}/${fullHealth}!`)
        }
        game.stats.hp = hp;
        game.monsters[monsterID][1] = monsterHP;
        if (monsterHP <= 0){
          console.log(`Congratulations, you killed the ${monsterName}`) 
          game.monsters[monsterID][3] = false;
        }
        theFunctionThatLoopsTheGameOverAndFuckingOver()
        return;
      },
      "Run Away": () => {
        responseTo.Travel()
      },
      "Check inventory for health potions": () => {
        const { healthPotions } = game.inventory;
        // eslint-disable-next-line prettier/prettier
        console.log(`Health Potions restore 35 hp. You have ${healthPotions} health potions.`);
        theFunctionThatLoopsTheGameOverAndFuckingOver()
        return;
      },
      "Take treasure": () => {
        let treasureID = game._inventory.treasure.reduce((acc, cur, i) => cur[0] === treasureName ? i : acc, null)
        game._inventory.treasure[treasureID][3] = false;
        game._inventory.treasureInPosession.push(treasureName)
        console.log(`Congratulations. You now have the ${treasureName}. Try taking it to the appraiser in town.`)
        theFunctionThatLoopsTheGameOverAndFuckingOver()
        return;
      },
    };
    // eslint-disable-next-line prettier/prettier
    let { decision } = await prompt({ type, message, choices, name: "decision" });
    responseTo[decision]();
  }
  theFunctionThatLoopsTheGameOverAndFuckingOver();
};
//when a game starts... what the hell do we do?

init();