//run with 'node ./public/js/inquirer'

const inquirer = require('inquirer');


//list choices for inquirer prompts. key is message.
const listChoices = { //key is the message. value is the choices
    'start game': ['start'],
    'choose role': ['Coward (+% flee chance)', 'Barbara the Wall (+pts hp)', 'Jabby McJabberson (+pts attack)'],
    'move directions': (directionObj) => Object.keys(directionObj).map(direction => ({ // directionObj = {north: true, south: true, east: false, west: true}
        name: direction,
        disabled: !directionObj[direction]
    })),
    'see monster': ['attack'], // 'inspect', 'talk to it', 'run away'...
    'see treasure chest': ['open chest'],
    'battle options': ['strike', 'dodge', 'flee'],
    'town options': [] //heal, store, whateve
}

const promptList = {
    'list': (key, choices, name, message) => ({ // directionObj = {north: true, south: true, east: false, west: true}...
        type: "list",
        choices: choices && !Array.isArray(listChoices[key]) ? listChoices[key](choices) :  listChoices[key] ,
        message: message ? message : key,
        name: name ? name : "res",
    }),
    'input': message => ({
        message,
        choices,
        name: "res",
        type: 'input'
    }),
    'order qty': (qty, name) => ({
        name: "res",
        type: "input",
        message: `How many ${name} would you like to buy?`,
        validate: input => !isNaN(input) && qty >= input ? true : `The number you entered is invalid. Please pick a number less than or equal to ${qty}.`
    })
};


const testData = {
    char: {
        hasChosenCharacter: false,
        roles: ['barb', 'druid', 'rogue'],
        inventory: {
            treasure: {
                'Bag of Copper Coins' : {
                    amount: 0
                },
                'silver  chalice' : {
                    amount: 40
                }
            },
            gold: 0
        }
    },
    coords: {
        x: 0,
        y: 3
    },
    monster: {
        hp: 0,
        atk: 2,
        lvl: 3
    },
    directions: {
        north: false,
        south: true,
        east: true,
        west: false
    }
}

const init = async () => {

    const prompt = (a, b, c, d) => inquirer.prompt(promptList.list(a, b, c, d));

    const {startGame} = await prompt('start game', null, 'startGame');
    console.log('player has chosen', startGame);

    const dealWithMonster = async () => {
        if (testData.monster) monster = true;
        if (!monster) console.log('there are no monsters present');
        else {
            console.log('A monster is present, he charges you, what do you do?');
            const {battleOption} = await prompt('battle options',null,'battleOption');
            console.log('battle option chosen:', battleOption)
            const choose = {
                'strike': () => {
                    console.log('nothing happens yet. pick again.')
                    dealWithMonster()
                },
                'flee': () => {
                    getNewCoords()
                },
                'dodge': () => {
                    console.log('nothing happens yet. pick again.')
                    dealWithMonster()
                }
            }
            choose[battleOption]();
        };
    }
    dealWithMonster()

    const getNewCoords = async (coords = testData.coords) => {
        const {direction} = await prompt('move directions', testData['directions'], direction);
        console.log('player has chosen to travel', direction);
        console.log('old coords', coords);
        let {x,y} = coords;
        if (direction === 'north')[x, y] = [x, y - 1];
        if (direction === 'south')[x, y] = [x, y + 1];
        if (direction === 'east')[x, y] = [x + 1, y];
        if (direction === 'west')[x, y] = [x - 1, y];
        const newCoords = {x,y};
        console.log('new coords', newCoords);
        return newCoords
    };

};

init()