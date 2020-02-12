const prompt = async function({name, message, type, choices, validate}){
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
}