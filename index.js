// cool way to read json files into js objects
const translations = require('./translations');
const prompt = require('prompt-sync')();
const consola = require('consola');

require('colors');

const EventEmitter = require('events').EventEmitter;

const emitter = new EventEmitter();


const cleanUp = (result) => {
    consola.log('Running clean up functions');

    // Unsubscribe
    emitter.removeListener('processComplete', cleanUp);
};

const notifyAdmins = (result) => {
    consola.log('Sending notifications');

    // emitter.removeListener('processComplete', cleanUp);
}

// Subscription
emitter.on('processComplete', cleanUp);

emitter.on('processComplete', notifyAdmins);



// Having both translations and this word list may prove a large burden on memory
// Think through a better way. May resolve itself when we move persistence to psql
const VALID_ENGLISH_WORDS = translations.data.map((translation) => translation['english']);


const persistTranslation = (translation) => {
    return { RESULT: 'SUCCESS' };
};


// We need to clean the word file of duplicate words, choosing the one with
// synonyms we prefer. Then it should be safe to replace the old entry with
// the updated form assembled here.
const createTranslation = (nde, eng) => {
    const translationJSON = translations.data.filter((translation) => translation['english'] == eng);

    const translation = {
        ndebele: nde,
        english: eng,
        translationDateTime: new Date().toJSON(),
        translatedBy: 'Busani Ndlovu (FRTNX/Qotho)',
        upVotes: 0,
        downVotes: 0
    };

    translationJSON[0].translations.push(translation);
    consola.log('Got translation json: ', translationJSON[0]);

    return translation;
};


const validateUserInput = (userInput) => {
    const translationArray = userInput.split('::');
    consola.log('Translation array: ', translationArray);

    if (translationArray.length > 2) {
        throw new Error('Too many values!');
    }

    if (translationArray.length < 2) {
        throw new Error('Not enough values!');
    }

    // Preserving input letter casing in case we need it later
    if (!VALID_ENGLISH_WORDS.includes(translationArray[1].toLowerCase())) {
        throw new Error('English word not found!')
    }

    // definitely add more validations

    return translationArray;
};


const acceptTranslations = () => {
    try {
        const userInput = prompt('nde::eng: ');
        consola.log('Recieved user input: ', userInput);

        const [nde, eng] = validateUserInput(userInput);
        consola.log('Got nde: ', nde);
        consola.log('And eng: ', eng);

        const translation = createTranslation(nde, eng);
        consola.log('Created translation: ', translation);

        const result = persistTranslation(translation);
        consola.success(result);

        emitter.emit('processComplete', result);
    } catch (err) {
        consola.fatal('FATAL_ERROR: '.red, err);
    }
};


acceptTranslations();
