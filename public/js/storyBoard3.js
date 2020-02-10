// var db = require("../models");

//run with 'node ./public/js/inquirer'
const Game = require("./Game");
const roles = require("./roles");
// const { prompt } = inquirer;
// const {prompt} = require("../../routes/htmlRoutes.js")
// const prompt = htmlRoutes.prompt;
let type = "list";
let playerName = "";
let selectedRole = "";
let game;

module.exports = function({ name, response }) {
  console.log({ name, response });
  //default values:
  let savedGames = [];
  const error = `error ${{ name, response }}`;
  //promptList
  const promptList = {
    init: res => {
      return res === "startNewOrContinue"
        ? {
            type: "list",
            message: "Welcome to Adventure Game. Please select start",
            choices: ["Start Game", "Continue Game"],
            name: "pick role",
            monster: null,
            background: "./img/tiles/town.jpg",
            name: "startNewOrContinue"
          }
        : { message: error };
    },
    startNewOrContinue: res =>
      res === "Start Game"
        ? {
            type: "input",
            message: "Please enter your character's name:",
            name: "pick name",
            validate: name => name.length >= 3 && name.length < 45
          }
        : res === "Continue Game"
        ? {
            choices: ["placeholder"],
            message: "Please choose your character's name",
            name: "game"
          }
        : { message: error },
    "pick name": res => {
      playerName = res;
      return {
        message: "Please select your character role:",
        choices: Object.keys(roles),
        name: "pick role"
      };
    },
    "pick role": res => {
      selectedRole = res;
      savedGames[playerName] = new Game({ selectedRole });
      game = savedGames[playerName];
      return {
        message:
          "\"Welcome\" to town! Here you will be able to sell treasure, buy health potions, heal at the inn, or upgrade weapons and armor at the blacksmith.",
        choices: [
          "Check Inventory",
          "Check my own stats",
          "Travel",
          "Go to Inn",
          "Go to Apothecary",
          "Go to Blacksmith",
          "Go to Appraiser"
        ],
        name: "decision"
      };
    },
    decision: res =>
      res === "Check Inventory"
        ? (function() {
            const { gold, healthPotions, treasureInPosession } = game.inventory;
            return {
              message: `Gold: $${gold} \n Health Potions: ${healthPotions} \n Treasure: ${treasureInPosession}`,
              choices: [
                "Check Inventory",
                "Check my own stats",
                "Travel",
                "Go to Inn",
                "Go to Apothecary",
                "Go to Blacksmith",
                "Go to Appraiser"
              ],
              name: "decision"
            };
          })()
        : res === "Check my own stats"
        ? (function() {
            const { hp, atk, dodge, maxHP } = game.stats;
            return {
              message: `Your health is ${hp}/${maxHP}. Your attack damage is ${atk}. Your dodge chance is ${(
                dodge * 10
              ).toFixed()}%.`,
              choices: [
                "Check Inventory",
                "Check my own stats",
                "Travel",
                "Go to Inn",
                "Go to Apothecary",
                "Go to Blacksmith",
                "Go to Appraiser"
              ],
              name: "decision"
            };
          })()
          : res === "Travel"
            ? (function() {
              const { directions: nsew } = game.locationData;
              const choices = Object.keys(nsew).map(direction =>
                nsew[direction]
                  ? `${direction}:  ${nsew[direction]}`
                  : `${direction}:  disabled`
              );
              choices.push("Cancel");
              return {
                type,
                choices,
                message: "Which direction do you want to travel?",
                name: "direction"
              };
            })()
            : { message: error },
    'direction': res => {

      const dir = res.split('. ')
      if (res === "Cancel") {
        return promptList['decision']("Travel")
      } else {
        const [newNSEW] = response.split(': ');
        console.log(newNSEW)
        game.updateCoords(newNSEW);
        const { currentLocation, monster, treasure } = game.locationData;
        let messageA =  `You travel ${newNSEW} to the ${currentLocation}. `;
        let planB = Array(4).fill(null);
        let [monsterName, hp, atk, monsterIsAlive] = monster || planB;
        let [treasureName, , , treasureIsAvailable] = treasure || planB;
        let promptList = {
          town: {
            // eslint-disable-next-line prettier/prettier
            message:  `${messageA} Welcome back to town! Here you will be able to sell treasure, buy health potions, heal at the inn, or upgrade weapons and armor at the blacksmith.`,
            // eslint-disable-next-line prettier/prettier
            choices: ["Check Inventory", "Check my own stats", "Travel", "Go to Inn", "Go to Apothecary", "Go to Blacksmith", "Go to Appraiser"],
          },
          monsterIsAlive: {
            message: `${messageA}You made it to ${currentLocation}. Oh no, it's a ${monsterName} with ${atk} attack, and ${hp} hp. ${
              // eslint-disable-next-line prettier/prettier
              treasureIsAvailable ? `It seems to be guarding a ${treasureName}. ` : ""
            } What do you want to do?`,
            // eslint-disable-next-line prettier/prettier
            choices: ["Check my own stats", "Attack monster", "Run Away", "Check inventory for health potions"]
          },
          treasureIsAvailable: {
            // eslint-disable-next-line prettier/prettier
            message: `${messageA}${monsterName && !monsterIsAlive ? `There appears to be a dead ${monsterName}. You must've killed it. ` : ""}Well there appears to be some treasure. A ${treasureName} by the looks of it. What do you want to do?`,
            choices: ["Run Away", "Take treasure"]
          },
          treasureTook: {
            // eslint-disable-next-line prettier/prettier
            message: `${messageA}You took the ${treasureName}. ${monsterName && !monsterIsAlive ? `I guess the ${monsterName} won't be needing it. ` : ""}Where to now?`,
            // eslint-disable-next-line prettier/prettier
            choices: ["Travel", "Check Inventory", "Check my own stats", "Check inventory for health potions"]
          },
          nothingSpecial: {
            message: `${messageA}Doesn't seem like anything's here...`,
            choices: [
              "Travel",
              "Check Inventory",
              "Check my own stats",
              "Check inventory for health potions"
            ]
          },
          navigate: {
            message: "",
            choices: []
          }
        };
        // eslint-disable-next-line prettier/prettier
        const selection = currentLocation === "Town" ? "town" : monsterIsAlive ?"monsterIsAlive" : treasureIsAvailable? "treasureIsAvailable" :"nothingSpecial";
        const { message , choices } = promptList[selection];
        return {message, choices, name: "decision"};
      }
      console.log("res?", res)
    }
  };
  let obj = promptList[name](response);
  obj.background = obj.background ? obj.background : "./img/tiles/town.jpg";
  obj.type = obj.type ? obj.type : "list";
  obj.monster = obj.monster ? obj.monster : null;
  return obj;
};

const init = async function() {
  // const type = "list";
  // const { startGame } = await prompt({
  //   type,
  //   message: "Welcome to Adventure Game. Press start to continue.",
  //   choices: [{ name: "start", value: true }],
  //   name: "startGame"
  // });

  // console.log("start game:", startGame);

  // const startNewOrContinue = async function() {
  //   const { continueOrNewGame } = await prompt({
  //     type,
  //     message: "Would you like to start a new game or continue a saved game?",
  //     choices: ["Start New Game", "Continue Saved Game"],
  //     name: "continueOrNewGame"
  //   });

  //   // create new game
  //   if (continueOrNewGame === "Start New Game") {
  //     const { "pick name": name } = await prompt({
  //       type: "input",
  //       message: "Please enter your character's name:",
  //       name: "pick name",
  //       validate: name => name.length >= 3 && name.length < 45
  //     });

  //     console.log(roles);

  //     const { "pick role": role } = await prompt({
  //       type,
  //       message: "Please select your character role:",
  //       choices: Object.keys(roles),
  //       name: "pick role"
  //     });

  //     savedGames[name] = new Game({ role });
  //     return name;
  //   }

  //   console.log("continue or new game:", continueOrNewGame);

  //   if (continueOrNewGame === "Continue Saved Game") {
  //     // if there are no saved games
  //     let keys = Object.keys(savedGames);
  //     if (!keys[0]) {
  //       console.log("There are no saved games.");
  //       startNewOrContinue();
  //     } else {
  //       const { name } = await prompt({
  //         type,
  //         choices: keys,
  //         message: "Please choose your character's name",
  //         name: "game"
  //       });
  //       return name;
  //     }
  //   }
  // };

  // let name = startGame ? await startNewOrContinue() : null;
  // let game = savedGames[name];

  const theFunctionThatLoopsTheGameOverAndFuckingOver = async function(
    lastDirection
  ) {
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
        message: `${ifTraveled}You made it to ${currentLocation}. Oh no, it's a ${monsterName} with ${atk} attack, and ${hp} hp. ${
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
        choices: ["Travel", "Check Inventory", "Check my own stats", "Check inventory for health potions"]
      },
      nothingSpecial: {
        message: `${ifTraveled}Doesn't seem like anything's here...`,
        choices: [
          "Travel",
          "Check Inventory",
          "Check my own stats",
          "Check inventory for health potions"
        ]
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
      // "Check Inventory": () => {
      //   const { gold, healthPotions, treasureInPosession } = game.inventory;
      //   console.log(`Gold: $${gold}`);
      //   console.log(`Health Potions: ${healthPotions}`);
      //   console.log(`Treasure: ${treasureInPosession}`);
      //   // console.log("inventory is not set up yet");
      //   theFunctionThatLoopsTheGameOverAndFuckingOver();
      // },
      Travel: async () => {
        // const { directions: nsew } = game.locationData;
        // const choices = Object.keys(nsew).map(direction => ({
        //   name: `${direction}:  ${nsew[direction]}`,
        //   disabled: !nsew[direction]
        // }));
        // choices.push("Cancel");
        // let { direction } = await prompt({
        //   type,
        //   choices,
        //   message: "Which direction do you want to travel?",
        //   name: "direction"
        // });
        direction = direction.split(": ");
        if (direction === "Cancel") {
          theFunctionThatLoopsTheGameOverAndFuckingOver();
        } else {
          const [newNSEW] = direction;
          game.updateCoords(newNSEW);
          theFunctionThatLoopsTheGameOverAndFuckingOver(newNSEW);
        }
      },
      "Go to Inn": async () => {
        const { hp, maxHP } = game.stats;
        let couldUseRest = maxHP - hp > 0;
        const { response } = await prompt({
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
        let maxPurchase = 4;
        maxPurchase -= healthPotions;
        maxPurchase =
          gold / price < maxPurchase ? (gold / price).toFixed() : maxPurchase;
        let message =
          gold < price
            ? "Come back when you have more money."
            : `${
              healthPotions < 1 ? "You're all out of health potions. " : ""
              }I can sell you up to ${maxPurchase} health potions. `;
        let choiceArray = [];
        if (maxPurchase > 0) {
          let arr = Array(parseInt(maxPurchase)).fill(0);
          arr.forEach((a, i) =>
            choiceArray.push(`Buy ${i + 1} health potions.`)
          );
        }
        choiceArray.push("Leave store.");
        let { quantity } = await prompt({
          type,
          message,
          choices: choiceArray,
          name: "quantity"
        });
        quantity = parseInt(quantity.split(" ")[1]);
        if (isNaN(quantity)) {
          console.log("Come back soon! And with more money!");
        } else {
          game._inventory.healthPotions += quantity;
          game._inventory.gold -= price * quantity;
          console.log(
            `You now have ${game._inventory.healthPotions} health potions.`
          );
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
          choices: [
            "$15: Boots (+5% dodge)",
            "$20: Weapon (+5 atk)",
            "$30: Helmet (+10 max hp)",
            "Leave Store."
          ],
          name: "item"
        });
        const choose = {
          "$15: Boots (+5% dodge)": () => {
            if (gold > 15) {
              gold -= 15;
              game._inventory.gold = gold;
              dodge += 0.5;
              game._stats.dodge = dodge;
              console.log(
                `You upgraded your boots! Your balance: $${gold}, Your dodge is now %${(
                  dodge * 10
                ).toFixed()}.`
              );
            } else {
              console.log(`You only have $${gold}. You need $15.`);
            }
            responseTo["Go to Blacksmith"]();
          },
          "$20: Weapon (+5 atk)": () => {
            if (gold > 20) {
              gold -= 20;
              game._inventory.gold = gold;
              atk += 5;
              game._stats.atk = atk;
              console.log(
                `You upgraded your weapon! Your balance: $${gold}, Your attack is now ${atk}.`
              );
            } else {
              console.log(`You only have $${gold}. You need $20.`);
            }
            responseTo["Go to Blacksmith"]();
          },
          "$30: Helmet (+10 max hp)": () => {
            if (gold > 30) {
              gold -= 30;
              game._inventory.gold = gold;
              fullHealth += 10;
              game._stats.fullHealth = fullHealth;
              console.log(
                `You upgraded your helmet! Your balance: $${gold}, Your max hp is now ${fullHealth}.`
              );
            } else {
              console.log(`You only have $${gold}. You need $30.`);
            }
            responseTo["Go to Blacksmith"]();
          },
          "Leave Store.": () => {
            console.log("Come back soon!");
            theFunctionThatLoopsTheGameOverAndFuckingOver();
          }
        };
        choose[item]();
        return;
      },
      "Go to Appraiser": async () => {
        let posessions = game._inventory.treasureInPosession;
        if (posessions.length > 0) {
          let { item } = await prompt({
            type,
            message:
              "Oh that looks like some nice stuff you have. Give it to me and I'll give you gold.",
            choices: posessions,
            name: "item"
          });
          let treasureID = game._inventory.treasure.reduce(
            (acc, cur, i) => (cur[0] === item ? i : acc),
            null
          );
          let price = game._inventory.treasure[treasureID][1];
          let { confirm } = await prompt({
            type,
            message: `Hey, that's a nice ${item}! I'll here's $${price} for your trouble. Whadda ya say?`,
            choices: ["okay..."],
            name: "confirm"
          });
          if (confirm) {
            let idx = game._inventory.treasureInPosession.indexOf(item);
            game._inventory.treasureInPosession.splice(item, 1);
            game._inventory.gold += price;
            console.log(
              `$${price} has now been added to your gold. You should go to the blacksmith and improve your attributes.`
            );
            theFunctionThatLoopsTheGameOverAndFuckingOver();
          }
        } else {
          let { confirm } = await prompt({
            type,
            message:
              "Doesnt look like you have any treasure... why dont you go look for some?",
            choices: ["okay..."],
            name: "confirm"
          });
          theFunctionThatLoopsTheGameOverAndFuckingOver();
        }
        return;
      },
      // "Check my own stats": () => {
      //   const { hp, atk, dodge, maxHP } = game.stats;
      //   console.log(`Your health is ${hp}/${maxHP}.`);
      //   console.log(`Your attack damage is ${atk}.`);
      //   console.log(`Your dodge chance is ${(dodge * 10).toFixed()}%.`);
      //   return theFunctionThatLoopsTheGameOverAndFuckingOver();
      // },
      "Attack monster": () => {
        //    let [monsterName, hp, atk, monsterIsAlive] = monster || planB;
        let { hp, atk, dodge, maxHP } = game.stats;
        let [monsterName, monsterHP, monsterATK] = monster;
        let monsterID = game.monsters.reduce(
          (acc, cur, i) => (cur[0] === monsterName ? i : acc),
          null
        );
        monsterHP -= atk;
        let message = `You attack the monster for ${atk} damage. Its health drops to ${monsterHP}.`;
        let didjaDodge = Math.random() * 10 <= dodge;
        if (didjaDodge && monsterHP > 0) {
          console.log(
            `${message} The ${monsterName} attacked you, but you dodged the attack!`
          );
        } else if (monsterHP > 0) {
          hp -= monsterATK;
          game._stats.hp = hp;
          console.log(
            `${message} The ${monsterName} attacked you. Your health is now ${hp}/${maxHP}!`
          );
        }
        game.stats.hp = hp;
        game.monsters[monsterID][1] = monsterHP;
        if (monsterHP <= 0) {
          console.log(`Congratulations, you killed the ${monsterName}`);
          game.monsters[monsterID][3] = false;
        }
        theFunctionThatLoopsTheGameOverAndFuckingOver();
        return;
      },
      "Run Away": () => {
        responseTo.Travel();
      },
      "Check inventory for health potions": () => {
        const { healthPotions } = game.inventory;
        // eslint-disable-next-line prettier/prettier
        console.log(`Health Potions restore 35 hp. You have ${healthPotions} health potions.`);
        theFunctionThatLoopsTheGameOverAndFuckingOver();
        return;
      },
      "Take treasure": () => {
        let treasureID = game._inventory.treasure.reduce(
          (acc, cur, i) => (cur[0] === treasureName ? i : acc),
          null
        );
        game._inventory.treasure[treasureID][3] = false;
        game._inventory.treasureInPosession.push(treasureName);
        console.log(
          `Congratulations. You now have the ${treasureName}. Try taking it to the appraiser in town.`
        );
        theFunctionThatLoopsTheGameOverAndFuckingOver();
        return;
      }
    };
    // eslint-disable-next-line prettier/prettier
    let { decision } = await prompt({ type, message, choices, name: "decision" });
    responseTo[decision]();
  };
  theFunctionThatLoopsTheGameOverAndFuckingOver();
};
//when a game starts... what the hell do we do?

// init();
