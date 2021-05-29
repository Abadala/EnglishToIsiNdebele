require('colors');

// Stub for custom logger. Still looking for the consola configuration that would 
// make this obsolete. The goal is to have prefixed datetime and neat, intuitive output,
// some symbols, some colors. Creating a custom one seems good for control.
class Consoled {
    constructor() {
        // for later
    }

    log() {
        const message = Object.values(arguments).join().replace(',', '');
        const currentTimeString = new Date().toJSON().grey;
        console.log(currentTimeString, message);
    }

    success() {
        const message = Object.values(arguments).join().replace(',', '');
        const currentTimeString = new Date().toJSON().grey;
        console.log(currentTimeString, message);
    }

    info() {
        const message = Object.values(arguments).join().replace(',', '');
        const currentTimeString = new Date().toJSON().grey;
        console.log(currentTimeString, message);
    }

    error() {
        const message = Object.values(arguments).join().replace(',', '');
        const currentTimeString = new Date().toJSON().grey;
        console.log(currentTimeString, message);
    }

}


module.exports = Consoled;