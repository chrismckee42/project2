const { startGame } = await prompt({
    type,
    message: "Welcome to Adventure Game. Press start to continue.",
    choices: [{ name: "start", value: true }],
    name: "startGame"
  });

  const { continueOrNewGame } = await prompt({
    type,
    message: "Would you like to start a new game or continue a saved game?",
    choices: ["Start New Game", "Continue Saved Game"],
    name: "continueOrNewGame"
  });

  const { 'pick name': name } = await prompt({
    type: "input",
    message: "Please enter your character's name:",
    name: "pick name",
    validate: name => name.length >= 3 && name.length < 45
  });

  
  const { 'pick role': role } = await prompt({
    type,
    message: "Please select your character role:",
    choices: Object.keys(roles),
    name: "pick role"
  });

  const { name } = await prompt({
    type,
    choices: keys,
    message: "Please choose your character's name",
    name: "game"
  });

  let { direction } = await prompt({
    type,
    choices,
    message: "Which direction do you want to travel?",
    name: "direction"
  });

  const response = await prompt({
    type,
    // eslint-disable-next-line prettier/prettier
    message: `${ couldUseRest ? "Some Zzz's might help with those bruises. " : "" } Would you like to rest a bit?`,
    choices: ["Yes", "No"],
    name: "response"
  });

  let { quantity } = await prompt({
    type,
    message,
    choices: choiceArray,
    name: "quantity"
  });

  const { item } = await prompt({
    type,
    message: `Welcome to the blacksmith, ${this.role}! Here we can upgrade those weak stats of yours. What would you like to upgrade?`,
    choices: ['$15: Boots (+5% dodge)', '$20: Weapon (+5 atk)', '$30: Helmet (+10 max hp)', 'Leave Store.'],
    name: 'item'
  });

  let { item } = await prompt({
    type,
    message:
      "Oh that looks like some nice stuff you have. Give it to me and I'll give you gold.",
    choices: posessions,
    name: "item"
  });

  let { confirm } = await prompt({
    type,
    message: `Hey, that's a nice ${item}! I'll here's $${price} for your trouble. Whadda ya say?`,
    choices: ["okay..."],
    name: "confirm"
  });

  let { confirm } = await prompt({
    type,
    message:
      "Doesnt look like you have any treasure... why dont you go look for some?",
    choices: ["okay..."],
    name: "confirm"
  });
  theFunctionThatLoopsTheGameOverAndFuckingOver();


let { decision } = await prompt({ type: 'list', message, choices, name: "decision" });
