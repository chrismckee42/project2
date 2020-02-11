/* eslint-disable indent */
/* eslint-disable prettier/prettier */
// var db = require("../models");

//run with 'node ./public/js/inquirer'
const Game = require('./Game');
const roles = require('./roles');
const API = require('./index.js')
// const { prompt } = inquirer;
// const {prompt} = require("../../routes/htmlRoutes.js")
// const prompt = htmlRoutes.prompt;
let type = 'list';
let playerName = '';
let selectedRole = '';
let selectedItem = '';
let appraisedValue = 0;
let game;
module.exports = function ({
  name,
  response
}) {
  console.count('FUCKING. WHY');
  console.log({
    name,
    response
  });
  //default values:
  let savedGames = [];
  const error = `error ${JSON.stringify({ name, response })}`;
  //promptList
  const promptList = {
    init: res => {
      return res === 'startNewOrContinue' ?
        {
          type: 'list',
          message: 'Welcome to Adventure Game. Please select start',
          choices: ['Start Game', 'Continue Game'],
          name: 'pick role',
          monster: null,
          background: './img/tiles/town.jpg',
          name: 'startNewOrContinue'
        } :
        {
          message: error
        };
    },
    startNewOrContinue: res =>
      res === 'Start Game' ? {
        type: 'input',
        message: 'Please enter your character\'s name:',
        name: 'pick name',
        validate: name => name.length >= 3 && name.length < 45
      } : res === 'Continue Game' ? {
        choices: ['placeholder'],
        message: 'Please choose your character\'s name',
        name: 'game'
      } : {
        message: error
      },
    'pick name': res => {
      playerName = res;
      return {
        message: 'Please select your character role:',
        choices: Object.keys(roles),
        name: 'pick role'
      };
    },
    'pick role': res => {
      selectedRole = res;
      // API.createGame(playerName,selectedRole)
      savedGames[playerName] = new Game({
        selectedRole
      });
      game = savedGames[playerName];
      return {
        message: '"Welcome" to town! Here you will be able to sell treasure, buy health potions, heal at the inn, or upgrade weapons and armor at the blacksmith.',
        choices: [
          'Check Inventory',
          'Check my own stats',
          'Travel',
          'Go to Inn',
          'Go to Apothecary',
          'Go to Blacksmith',
          'Go to Appraiser'
        ],
        name: 'decision'
      };
    },
    decision: res =>
    res === 'Attack monster' ? (function(){
      let {
        currentLocation,
        monster,
        treasure
      } = game.locationData;
        //    let [monsterName, hp, atk, monsterIsAlive] = monster || planB;
        let { hp, atk, dodge, maxHP } = game.stats;
        let [monsterName, monsterHP, monsterATK] = monster ? monster : [null, null, null];
        let monsterID = game.monsters.reduce(
          (acc, cur, i) => (cur[0] === monsterName ? i : acc),
          null
        );
        monsterHP -= atk;
        let messageA = `You attack the monster for ${atk} damage. Its health drops to ${monsterHP}.`;
        let didjaDodge = Math.random() * 10 <= dodge;
        if (didjaDodge && monsterHP > 0) {
          messageA =
            `${messageA} The ${monsterName} attacked you, but you dodged the attack!`
          
        } else if (monsterHP > 0) {
          hp -= monsterATK;
          game._stats.hp = hp;
          messageA =
            `${messageA} The ${monsterName} attacked you. Your health is now ${hp}/${maxHP}!`
          
        }
        game.stats.hp = hp;
        if (monster) game.monsters[monsterID][1] = monsterHP;
        if (monster && monsterHP <= 0) {
          console.log(`Congratulations, you killed the ${monsterName}`);
          game.monsters[monsterID][3] = false;
        }
        
        // console.log(game.)
        let planB = Array(4).fill(null);
        let [, , , monsterIsAlive] = monster ? monster : planB;
        //  treasure = game.locationData.treasure
        let [treasureName, , , treasureIsAvailable] = treasure ? treasure : planB;
        let promptList = {
          town: {
            // eslint-disable-next-line prettier/prettier
            message: `${messageA} Welcome back to town! Here you will be able to sell treasure, buy health potions, heal at the inn, or upgrade weapons and armor at the blacksmith.`,
            // eslint-disable-next-line prettier/prettier
            choices: ['Check Inventory', 'Check my own stats', 'Travel', 'Go to Inn', 'Go to Apothecary', 'Go to Blacksmith', 'Go to Appraiser'],
          },
          monsterIsAlive: {
            message: `${messageA}You made it to ${currentLocation}. Oh no, it's a ${monsterName} with ${atk} attack, and ${hp} hp. ${
              // eslint-disable-next-line prettier/prettier
              treasureIsAvailable ? `It seems to be guarding a ${treasureName}. ` : ''
            } What do you want to do?`,
            // eslint-disable-next-line prettier/prettier
            choices: ['Check my own stats', 'Attack monster', 'Run Away', 'Check inventory for health potions']
          },
          treasureIsAvailable: {
            // eslint-disable-next-line prettier/prettier
            message: `${messageA}${monsterName && !monsterIsAlive ? `There appears to be a dead ${monsterName}. You must've killed it. ` : ''}Well there appears to be some treasure. A ${treasureName} by the looks of it. What do you want to do?`,
            choices: ['Run Away', 'Take treasure']
          },
          treasureTook: {
            // eslint-disable-next-line prettier/prettier
            message: `${messageA}You took the ${treasureName}. ${monsterName && !monsterIsAlive ? `I guess the ${monsterName} won't be needing it. ` : ''}Where to now?`,
            // eslint-disable-next-line prettier/prettier
            choices: ['Travel', 'Check Inventory', 'Check my own stats', 'Check inventory for health potions']
          },
          nothingSpecial: {
            message: `${messageA}Doesn't seem like anything's here...`,
            choices: [
              'Travel',
              'Check Inventory',
              'Check my own stats',
              'Check inventory for health potions'
            ]
          },
          navigate: {
            message: '',
            choices: []
          }
        };
        // eslint-disable-next-line prettier/prettier
        const selection = currentLocation === 'Town' ? 'town' : monsterIsAlive ? 'monsterIsAlive' : treasureIsAvailable ? 'treasureIsAvailable' : 'nothingSpecial';
        var {
          message,
          choices
        } = promptList[selection];
        message = messageA + message;
        return {
          message,
          choices,
          name: 'decision'
        };
      
    })() :
      res === 'Take treasure' ? (function () {
                                                 const { currentLocation, monster, treasure } = game.locationData;
                                                 // eslint-disable-next-line prettier/prettier

                                                 let planB = Array(4).fill(null);
                                                 let [monsterName, hp, atk, monsterIsAlive] = monster || planB;
                                                 let [treasureName, , , treasureIsAvailable] = treasure || planB;

                                                 let treasureID = game._inventory.treasure.reduce(
                                                     (acc, cur, i) => (cur[0] === treasureName ? i : acc),
                                                     null,
                                                 );
                                                 game._inventory.treasure[treasureID][3] = false;
                                                 game._inventory.treasureInPosession.push(treasureName);

                                                 let message = `Congratulations. You now have the ${treasureName}. Try taking it to the appraiser in town.`; /* + obj.message;*/
                                                 return {
                                                     message,
                                                     choices: [
                                                         'Travel',
                                                         'Check Inventory',
                                                         'Check my own stats',
                                                         'Check inventory for health potions',
                                                     ],
                                                     name: 'decision',
                                                 };
                                             })() :
      res === 'Check Inventory' ? (function () {
        const {
          gold,
          healthPotions,
          treasureInPosession
        } = game.inventory;
        return {
          message: `Gold: $${gold} \n Health Potions: ${healthPotions} \n Treasure: ${treasureInPosession}`,
          choices: ['Check Inventory', 'Check my own stats', 'Travel', 'Go to Inn', 'Go to Apothecary', 'Go to Blacksmith', 'Go to Appraiser'],
          name: 'decision'
        };
      })() :
      res === 'Check my own stats' ?
      (function () {const {hp,atk,dodge,maxHP} = game.stats;
        return {
          message: `Your health is ${hp}/${maxHP}. Your attack damage is ${atk}. Your dodge chance is  ${(dodge * 10).toFixed()}%.`,
          name: 'decision',
          choices: [
            'Check Inventory',
            'Check my own stats',
            'Travel',
            'Go to Inn',
            'Go to Apothecary',
            'Go to Blacksmith',
            'Go to Appraiser'
          ]
        };
      })() :
      res === 'Travel' || res === 'Run Away' ?
      (function () {
        const {
          directions: nsew
        } = game.locationData;
        const choices = Object.keys(nsew).map(direction =>
          nsew[direction] ?
          `${direction}:  ${nsew[direction]}` :
          `${direction}:  disabled`
        );
        choices.push('Cancel');
        return {
          type,
          choices,
          message: 'Which direction do you want to travel?',
          name: 'direction'
        };
      })() :
      res === 'Go to Inn' ?
      (function () {
        const {
          hp,
          maxHP
        } = game.stats;
        let couldUseRest = maxHP - hp > 0;
        return {
          type,
          // eslint-disable-next-line prettier/prettier
          message: `${ couldUseRest ? 'Some Zzz\'s might help with those bruises. ' : '' } Would you like to rest a bit?`,
          choices: ['Yes', 'No'],
          name: 'wantToSleep'
        };
      })() :
      res === 'Go to Apothecary' ? (function () {
        let price = 5;
        let {gold,healthPotions} = game.inventory;
        let maxPurchase = 4;
        maxPurchase -= healthPotions;
        maxPurchase = gold / price < maxPurchase ? (gold / price).toFixed() : maxPurchase;
        let message = gold < price ? 'Come back when you have more money.' :
          `${ healthPotions < 1 ? 'You\'re all out of health potions. ' : '' }
            I can sell you up to ${maxPurchase} health potions. `;
        let choiceArray = [];

        if (maxPurchase > 0) {
          let arr = Array(parseInt(maxPurchase)).fill(0);
          arr.forEach((a, i) =>
            choiceArray.push(`Buy ${i + 1} health potions.`)
          );
        }
        
        choiceArray.push('Leave store.');
        return ({
          type,
          message,
          choices: choiceArray,
          name: 'purchaseHealthPotionQuantity'
        });
      })() :
      res === 'Go to Blacksmith' ? (function () {
        let {
          hp,
          atk,
          dodge,
          fullHealth
        } = game._stats;
        let {
          gold,
          healthPotions,
          treasureInPosession
        } = game._inventory;
        return {
          type,
          message: `Welcome to the blacksmith, ${game.roleSelected}! Here we can upgrade those weak stats of yours. What would you like to upgrade?`,
          choices: [
            '$15: Boots (+5% dodge)',
            '$20: Weapon (+5 atk)',
            '$30: Helmet (+10 max hp)',
            'Leave Store.'
          ],
          name: 'chooseItemAtBlackSmith'
        };
      })() :
      res === 'Go to Appraiser' ? (function () {
        let posessions = game._inventory.treasureInPosession;
        if (posessions.length > 0) {
          return ({
            type,
            message: 'Oh that looks like some nice stuff you have. Give it to me and I\'ll give you gold.',
            choices: posessions,
            name: 'appraiseItem'
          });
        } else {
         return({
            type,
            message:
              'Doesnt look like you have any treasure... why dont you go look for some?',
            choices: ['Run Away'],
            name: 'decision'
          });
        }
      })() : {
        message: error
      },
    appraiseItem: res => {
      let item = res;
      selectedItem = res;
      console.log('----------------------------------------------=')
      let idx = game._inventory.treasureInPosession.indexOf(item);
      const {treasure} = game._inventory
      console.log({treasure})
      let row =  game._inventory.treasure.filter(a => a[0] === res)
      console.log({res})
      console.log({row})
      appraisedValue = game._inventory.treasure.filter(a => a[0] === res)[0][1]
      game._inventory.treasureInPosession.splice(idx, 1);
      console.log('----------------------------------------------=')
      console.log({appraisedValue})
      game._inventory.gold += appraisedValue;
      return {
        type,
        message: `Hey, that's a nice ${selectedItem}! I'll here's $${appraisedValue} for your trouble. Whadda ya say?`,
        choices: ['okay...'],
        name: 'appraiseItem2'
      }
    },
    appraiseItem2: res => {
        if (isNaN(game._inventory.gold) ){game._inventory.gold = 100;}
      return({
        type,
        message: `You should go to the blacksmith and improve your attributes.`,
        choices: ['Run Away'],
        name: 'decision'
      }); 
    
    },
    chooseItemAtBlackSmith: res => {
      let message = '';
      let {
        gold,
        healthPotions
      } = game.inventory;
      const backToBlackSmith = (message = message) => ({
        type,
        message,
        choices: [
          '$15: Boots (+5% dodge)',
          '$20: Weapon (+5 atk)',
          '$30: Helmet (+10 max hp)',
          'Leave Store.'
        ],
        name: 'chooseItemAtBlackSmith'
      });
      if (res === '$15: Boots (+5% dodge)') {
        if (gold > 15) {
          gold -= 15;
          game._inventory.gold = gold;
          dodge += 0.5;
          game._stats.dodge = dodge;
          message = `You upgraded your boots! Your balance: $${gold}, Your dodge is now %${(
            dodge * 10
          ).toFixed()}.`;
        } else {
          message = `You only have $${gold}. You need $15.`;
        }
        backToBlackSmith();
      }
      if (res === '$20: Weapon (+5 atk)') {
        if (gold > 20) {
          gold -= 20;
          game._inventory.gold = gold;
          atk += 5;
          game._stats.atk = atk;
          message = `You upgraded your weapon! Your balance: $${gold}, Your attack is now ${atk}.`;
        } else {
          message = `You only have $${gold}. You need $20.`;
        }
        backToBlackSmith();
      }

      if (res === '$30: Helmet (+10 max hp)') {
        if (gold > 30) {
          gold -= 30;
          game._inventory.gold = gold;
          fullHealth += 10;
          game._stats.fullHealth = fullHealth;
          message = `You upgraded your helmet! Your balance: $${gold}, Your max hp is now ${fullHealth}.`;
        } else {
          message = `You only have $${gold}. You need $30.`;
        }
        backToBlackSmith();
      }
      if (res === 'Leave Store.') {
        return {
          message: 'Come back soon!',
          choices: [
            'Check Inventory',
            'Check my own stats',
            'Travel',
            'Go to Inn',
            'Go to Apothecary',
            'Go to Blacksmith',
            'Go to Appraiser'
          ],
          name: 'decision'
        };
      }
    },
    purchaseHealthPotionQuantity: res => {
      let price = 5;
      let quantity = parseInt(res.split(' ')[1]);
      let message = '';
      if (isNaN(quantity)) {
        message = 'Come back soon! And with more money!';
      } else {
        game._inventory.healthPotions += quantity;
        game._inventory.gold -= price * quantity;
        message = `You now have ${game._inventory.healthPotions} health potions.`;
      }
      return {
        message,
        choices: [
          'Check Inventory',
          'Check my own stats',
          'Travel',
          'Go to Inn',
          'Go to Apothecary',
          'Go to Blacksmith',
          'Go to Appraiser'
        ],
        name: 'decision'
      };
    },
    wantToSleep: res => {
      if (res === 'Yes') {
        game.sleep();
      }
      return {
        message: 'Come back any time.',
        choices: [
          'Check Inventory',
          'Check my own stats',
          'Travel',
          'Go to Inn',
          'Go to Apothecary',
          'Go to Blacksmith',
          'Go to Appraiser'
        ],
        name: 'decision'
      };
    },
    direction: res => {
      console.count('COUNT');

      const dir = res.split('. ');
      if (res === 'Cancel') {
        if (game.locationData.currentLocation === 'Town') {
          return {
            message: 'What should we do?',
            choices: [
              'Check Inventory',
              'Check my own stats',
              'Travel',
              'Go to Inn',
              'Go to Apothecary',
              'Go to Blacksmith',
              'Go to Appraiser'
            ],
            name: 'decision'
          };
        } else {
          return {
            message: 'What would you like to do?',
            choices: ['Check Inventory', 'Check my own stats', 'Travel'],
            name: 'decision'
          };
        }
      } else {
        const [newNSEW, loc] = response.split(': ');
        console.log(newNSEW);
        game.updateCoords(newNSEW, loc);

        console.count('does this get ran????');
        const {
          currentLocation,
          monster,
          treasure
        } = game.locationData;
        let messageA = `You travel ${newNSEW} to the ${currentLocation}. `;
        let planB = Array(4).fill(null);
        let [monsterName, hp, atk, monsterIsAlive] = monster ? monster : planB;
        let [treasureName, , , treasureIsAvailable] = treasure ?  treasure :  planB;
        let promptList = {
          town: {
            // eslint-disable-next-line prettier/prettier
            message: `${messageA} Welcome back to town! Here you will be able to sell treasure, buy health potions, heal at the inn, or upgrade weapons and armor at the blacksmith.`,
            // eslint-disable-next-line prettier/prettier
            choices: ['Check Inventory', 'Check my own stats', 'Travel', 'Go to Inn', 'Go to Apothecary', 'Go to Blacksmith', 'Go to Appraiser'],
          },
          monsterIsAlive: {
            message: `${messageA}You made it to ${currentLocation}. Oh no, it's a ${monsterName} with ${atk} attack, and ${hp} hp. ${
              // eslint-disable-next-line prettier/prettier
              treasureIsAvailable ? `It seems to be guarding a ${treasureName}. ` : ''
            } What do you want to do?`,
            // eslint-disable-next-line prettier/prettier
            choices: ['Check my own stats', 'Attack monster', 'Run Away', 'Check inventory for health potions']
          },
          treasureIsAvailable: {
            // eslint-disable-next-line prettier/prettier
            message: `${messageA}${monsterName && !monsterIsAlive ? `There appears to be a dead ${monsterName}. You must've killed it. ` : ''}Well there appears to be some treasure. A ${treasureName} by the looks of it. What do you want to do?`,
            choices: ['Run Away', 'Take treasure']
          },
          treasureTook: {
            // eslint-disable-next-line prettier/prettier
            message: `${messageA}You took the ${treasureName}. ${monsterName && !monsterIsAlive ? `I guess the ${monsterName} won't be needing it. ` : ''}Where to now?`,
            // eslint-disable-next-line prettier/prettier
            choices: ['Travel', 'Check Inventory', 'Check my own stats', 'Check inventory for health potions']
          },
          nothingSpecial: {
            message: `${messageA}Doesn't seem like anything's here...`,
            choices: [
              'Travel',
              'Check Inventory',
              'Check my own stats',
              'Check inventory for health potions'
            ]
          },
          navigate: {
            message: '',
            choices: []
          }
        };
        // eslint-disable-next-line prettier/prettier
        const selection = currentLocation === 'Town' ? 'town' : monsterIsAlive ? 'monsterIsAlive' : treasureIsAvailable ? 'treasureIsAvailable' : 'nothingSpecial';
        const {
          message,
          choices
        } = promptList[selection];
        return {
          message,
          choices,
          name: 'decision'
        };
      }
      console.log('res?', res);
    }
  };
  var obj = promptList[name](response);
  obj.background = obj.background ? obj.background : './img/tiles/town.jpg';
  if (game) {
    let str = game.locationData.currentLocation.toLowerCase().split(' ').join('-')
    obj.background = `./img/tiles/${str}.jpg`
  }
  console.log(game && game.locationData ? game.locationData.currentLocation : null)
  obj.type = obj.type ? obj.type : 'list';
  obj.monster = obj.monster ? obj.monster : null;

 if (game){
   if (game.locationData.monster){
    let [monster] = game.locationData.monster
   

  if (monster) {
    monster = monster.toLowerCase();
   if (monster === 'troll'){
     monster = 'troll.gif'
   }
   else {
     monster = monster + '.png'
   }
   obj.monster = './img/monsters/' + monster;
  }
 }
 }
 

  return obj;
};
