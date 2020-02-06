//run with 'node ./public/js/inquirer'
const inquirer = require("inquirer");

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
      this.stats = stats[role]; //0 : hp, 1: atk, 2: dodge chance (x = x/10 times a strike will mss)
      this.inventory = inventory
        ? inventory
        : {
            gold: 0,
            treasure: [
              // 0: name, 1: amount,  2: location id, 3: still at location,
              ["Emerald Knife", 20, 7, true],
              ["Jeweled Crown", 50, 9, true],
              ["Bag of Copper Coins", 5, 2, true],
              ["Silver Chalice", 50, 1, true],
              ["Chest of loot", 100, 4, true]
            ],
            healthPotions: [0, 35] // 0: quantity in inventory: 1: amount healed
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
        this.monsters.filter(monster => monster[3] === id).length > 0
        ? this.monsters.filter(monster => monster[3] === id)[0]
        : false,
        treasure :
          this.inventory.treasure.filter(treasure => treasure[2] === id)
            .length > 0
            ? this.inventory.treasure.filter(treasure => treasure[2] === id)[0]
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
    let ifTraveled = lastDirection ? `You travel ${lastDirection} to the ${currentLocation}. ` : '';
    let planB = Array(4).fill(null);
    let [monsterName, hp, atk, monsterIsAlive] = monster || planB;
    let [treasureName, amt, loc, treasureIsAvailable] = treasure || planB;

    let promptList = {
      town: {
        message: `${ifTraveled ? ifTraveled + 'Welcome back' : 'Welcome'} to town! Here you will be able to sell treasure, buy health potions, heal at the inn, or upgrade weapons and armor at the blacksmith.`,
        choices: ['Check inventory', 'Travel', 'Go to Inn', 'Go to Apothecary', 'Go to Blacksmith', 'Go to appraiser'],
      },
      monsterIsAlive: {
        message:`${ifTraveled}You made it to ${currentLocation}. Oh no, it's a ${monsterName} with ${atk} attack, and ${hp} hp. ${
          treasureIsAvailable ? `It seems to be guarding a ${treasureName}. ` : ""
        } What do you want to do?`,
        choices: ['Check my own stats', 'Attack monster', 'Run Away', 'Check inventory for health potions']
      },
      treasureIsAvailable: {
        message: `${ifTraveled}${monsterName && !monsterIsAlive ? `There appears to be a dead ${monsterName}. You must've killed it. ` : ``}Well there appears to be some treasure. A ${treasureName} by the looks of it. What do you want to do?`,
        choices: ['Run away', 'Take treasure']
      },
      treasureTook: {
        message: `${ifTraveled}You took the ${treasureName}. ${monsterName && !monsterIsAlive ? `I guess the ${monsterName} won't be needing it. ` : ``}Where to now?`,
        choices: ['Travel', 'Check inventory', 'Check my own stats', 'Check inventory for health potions']
      },
      nothingSpecial: {
        message: '',
        choices: []
      },
      navigate: {
        message: '',
        choices: []
      }
    };
    const selection = currentLocation === 'Town' ? 'town' : monsterIsAlive ?'monsterIsAlive' : treasureIsAvailable? 'treasureIsAvailable' :'nothingSpecial';
    const {message, choices} = promptList[selection];
    const responseTo = {
      'Check Inventory' : () =>{
        console.log("inventory is not set up yet");
        theFunctionThatLoopsTheGameOverAndFuckingOver()
      },
      'Travel' : async () =>{
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
      'Go to Inn' : () => {
        console.log('Inn is not set up yet')
        theFunctionThatLoopsTheGameOverAndFuckingOver()
      },
      'Go to Apothecary' : () =>{
        console.log('Apothecary is not set up yet')
        theFunctionThatLoopsTheGameOverAndFuckingOver()
      },
      'Go to Blacksmith' : () =>{
        console.log('Blacksmith is not set up yet')
        theFunctionThatLoopsTheGameOverAndFuckingOver()
      },
      'Go to appraiser' : () =>{
        console.log('Appraiser is not set up yet')
        theFunctionThatLoopsTheGameOverAndFuckingOver()
      },
      'Check my own stats' : () =>{
        console.log('Check stats is not set up yet')
        theFunctionThatLoopsTheGameOverAndFuckingOver()
      },
      'Attack monster' : () =>{
        console.log('Attack monster is not set up yet')
        theFunctionThatLoopsTheGameOverAndFuckingOver()
      },
      'Run Away': () =>{
        responseTo.Travel()
      },
      'Check inventory for health potions' : () =>{
        console.log('Check inventory for health potions is not set up yet')
        theFunctionThatLoopsTheGameOverAndFuckingOver()
      },
      'Take treasure': () =>{
        console.log('Take treasure is not set up yet')
        theFunctionThatLoopsTheGameOverAndFuckingOver()
      },
    };
    const {decision} = await prompt({type, message, choices, name: 'decision'});
    responseTo[decision]();
  }
  theFunctionThatLoopsTheGameOverAndFuckingOver();
};
//when a game starts... what the hell do we do?

init();
