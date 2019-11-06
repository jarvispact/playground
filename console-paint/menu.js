const readline = require('readline');
const { MENU_STATES, GEOMETRY_TYPES } = require('./constants');
const { formatRectangle } = require('./rectangle');
const { formatQuad } = require('./quad');
const { formatRhombus } = require('./rhombus');

const dimensionSelectMenuOptions = [
    { idx: '1', text: 'Breite festlegen', nextState: MENU_STATES.DIMENSION_SELECT_WIDTH },
    { idx: '2', text: 'Höhe festlegen', nextState: MENU_STATES.DIMENSION_SELECT_HEIGHT },
    { idx: '3', text: 'Zurück zum Hauptmenü', nextState: MENU_STATES.MAIN_MENU },
];

const mainMenuOptions = [
    { idx: '1', text: 'Zeichenfeld festlegen', nextState: MENU_STATES.DIMENSION_SELECT },
    { idx: '2', text: 'Zeichenfeld anzeigen', nextState: MENU_STATES.SHOW_CANVAS },
    { idx: '3', text: 'Objekt erzeugen', nextState: MENU_STATES.CREATE_GEOMETRY },
    { idx: '4', text: 'Objekt löschen', nextState: MENU_STATES.DELETE_GEOMETRY },
    { idx: '5', text: 'Programm beenden', nextState: MENU_STATES.EXIT_MENU },
];

const createGeometryOptions = [
    { idx: '1', text: 'Rechteck', nextState: MENU_STATES.GEOMETRY_RECTANGLE_X },
    { idx: '2', text: 'Quadrat', nextState: MENU_STATES.GEOMETRY_QUAD_X },
    { idx: '3', text: 'Rhombus', nextState: MENU_STATES.GEOMETRY_RHOMBUS_X },
    { idx: '4', text: 'Zurück zum Hauptmenü', nextState: MENU_STATES.MAIN_MENU },
];

const formatGeometryLookupTable = {
    [GEOMETRY_TYPES.RECTANGLE]: formatRectangle,
    [GEOMETRY_TYPES.QUAD]: formatQuad,
    [GEOMETRY_TYPES.RHOMBUS]: formatRhombus,
};

const getDeleteGeometryOptions = (geometryState) => {
    const options = geometryState.map((geometry, idx) => {
        const formattedText = formatGeometryLookupTable[geometry.type](geometry);
        return { idx: String(idx), text: formattedText, nextState: MENU_STATES.MAIN_MENU };
    });

    return [...options, { idx: String(options.length), text: 'Zurück zum Hauptmenü', nextState: MENU_STATES.MAIN_MENU }];
};

const printMenu = (options) => {
    console.log('');
    options.forEach(({ idx, text }) => console.log(`(${idx}) ${text}`));
    console.log('');
};

const clearConsole = () => {
    const blank = '\n'.repeat(process.stdout.rows);
    console.log(blank);
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
};

module.exports = {
    dimensionSelectMenuOptions,
    mainMenuOptions,
    createGeometryOptions,
    getDeleteGeometryOptions,
    printMenu,
    clearConsole,
};