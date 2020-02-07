//run with 'node ./public/js/inquirer'

const inquirer = require('inquirer');

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
    'list': (message, directionObj) => ({ // directionObj = {north: true, south: true, east: false, west: true}...
        type: "list",
        choices: directionObj && !Array.isArray(listChoices[message]) ? listChoices[message](directionObj) : directionObj === undefined ? listChoices[message] : ['error'],
        message: message,
        name: "res",
    }),
    'input': message => ({
        message,
        choices,
        name: "res",
        type: 'input'
    }),
    'order qty': (qty, name) => ({
        name: "purchase",
        type: "input",
        message: `How many ${name} would you like to buy?`,
        validate: input => !isNaN(input) && qty >= input ? true : `The number you entered is invalid. Please pick a number less than or equal to ${qty}.`
    })
};


const testData = {
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

    const prompt = (message, choices) => choices ? inquirer.prompt(promptList.list(message, choices)) : inquirer.prompt(promptList.list(message));

    const {res: startGame} = await prompt('start game');
    console.log('player has chosen', startGame);

    const dealWithMonster = async () => {
        if (testData.monster) monster = true;
        if (!monster) console.log('there are no monsters present');
        else {
            console.log('A monster is present, he charges you, what do you do?');
            const {res: battleOption} = await prompt('battle options');
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
        const {res: direction} = await prompt('move directions', testData['directions']);
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