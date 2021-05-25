// cool way to read json files into js objects
const translations = require('./translations');
const prompt = require('prompt-sync')();
const util = require('util');

// ALGO:

const persistTranslation = (translation) => {
    return { RESULT: 'SUCCESS' };
};


const createTranslation = (nde, eng) => {
    const translation = {
        english: eng,
        ndebele: nde
    };

    return translation;
};


const validateUserInput = (userInput) => {
    const translationArray = userInput.split('::');
    util.log('Translation array: ', translationArray);

    if (translationArray.length > 2) {
        throw new Error('Too many values!');
    }

    if (translationArray.length < 2) {
        throw new Error('Not enough values!');
    }

    // definitely add more validations
    return translationArray;
};


const acceptTranslations = () => {
    try {
        const userInput = prompt('nde::eng: ');
        util.log('Recieved user input: ', userInput);

        const [nde, eng] = validateUserInput(userInput);
        util.log('Got nde: ', nde);
        util.log('And eng: ', eng);

        const translation = createTranslation(userInput);
        util.log('Created translation: ', translation);

        const result = persistTranslation(translation);
        util.log('RESULT: ', result);
    } catch (err) {
        util.log('FATAL_ERROR: ', err);
    }
};


acceptTranslations();
