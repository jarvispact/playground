const stateEmitter = require('./state-emitter');

const invalidOptionSelected = (userInput, nextState) => {
    console.log(`Die Option "${userInput}" gibt es nicht`);
    stateEmitter.emit(nextState, { clearScreen: false });
};

const invalidCoordinateEntered = (userInput, nextState) => {
    console.log(`"${userInput}" ist keine Nummer. Elaubt sind negative, positive Nummern und "0"`);
    stateEmitter.emit(nextState, { clearScreen: false });
};

const invalidDimensionEntered = (userInput, nextState) => {
    console.log(`"${userInput}" ist nicht erlaubt. Erlaubt sind nur Nummern die größer als "0" sind`);
    stateEmitter.emit(nextState, { clearScreen: false });
};

const invalidRhombusHeightEntered = (nextState) => {
    console.log(`Die Höhe eines Rhombus darf nicht durch 2 teilbar sein`);
    stateEmitter.emit(nextState, { clearScreen: false });
};

const deleteWithEmptyObjects = () => {
    console.log('Keine Objekte zum löschen vorhanden');
    return stateEmitter.emit(MENU_STATES.MAIN_MENU, { clearScreen: false });
};

const invalidDimension = (userInput, dimension, nextState) => {
    console.log(`Der eingegebene Wert: "${userInput}" ist für die "${dimension}" ungültig`);
    return stateEmitter.emit(nextState, { clearScreen: false });
};

module.exports = {
    invalidOptionSelected,
    invalidCoordinateEntered,
    invalidDimensionEntered,
    invalidDimension,
    deleteWithEmptyObjects,
    invalidRhombusHeightEntered,
};