const ask = require('./ask');
const stateEmitter = require('./state-emitter');
const { MENU_STATES } = require('./constants');
const { createRectangle, createRectangleBuffer } = require('./rectangle');
const { createQuad, createQuadBuffer } = require('./quad');
const { createRhombus, createRhombusBuffer } = require('./rhombus');
const { printCanvas } = require('./canvas');
const { parseAsInt } = require('./utils');

const {
    dimensionSelectMenuOptions,
    mainMenuOptions,
    createGeometryOptions,
    getDeleteGeometryOptions,
    printMenu,
    clearConsole
} = require('./menu');

const {
    invalidOptionSelected,
    invalidCoordinateEntered,
    invalidDimensionEntered,
    invalidDimension,
    deleteWithEmptyObjects,
    invalidRhombusHeightEntered
} = require('./errors');

(async () => {
    let canvasWidth;
    let canvasHeight;
    let geometryState = [];

    const rectangleBuffer = createRectangleBuffer();
    const quadBuffer = createQuadBuffer();
    const rhombusBuffer = createRhombusBuffer();

    stateEmitter
    .on(MENU_STATES.EXIT_MENU, async ({ clearScreen = true } = {}) => {
        if (clearScreen) clearConsole();
        console.log('Bye!');
    })
    .on(MENU_STATES.DIMENSION_SELECT, async ({ clearScreen = true } = {}) => {
        if (clearScreen) clearConsole();
        printMenu(dimensionSelectMenuOptions);
        const userInput = await ask('Aktion auswählen: ');
        const nextState = (dimensionSelectMenuOptions.find(({ idx }) => idx === userInput) || {}).nextState;
        if (!nextState) return invalidOptionSelected(userInput, MENU_STATES.DIMENSION_SELECT);
        stateEmitter.emit(nextState);
    })
    .on(MENU_STATES.DIMENSION_SELECT_WIDTH, async ({ clearScreen = true } = {}) => {
        if (clearScreen) clearConsole();
        const userInput = await ask('Canvas Breite festlegen: ');
        const width = parseAsInt(userInput);
        if (width <= 0) return invalidDimension(userInput, 'Breite', MENU_STATES.DIMENSION_SELECT_WIDTH);
        canvasWidth = width;
        stateEmitter.emit(MENU_STATES.DIMENSION_SELECT);
    })
    .on(MENU_STATES.DIMENSION_SELECT_HEIGHT, async ({ clearScreen = true } = {}) => {
        if (clearScreen) clearConsole();
        const userInput = await ask('Canvas Höhe festlegen: ');
        const height = parseAsInt(userInput);
        if (height <= 0) return invalidDimension(userInput, 'Höhe', MENU_STATES.DIMENSION_SELECT_HEIGHT);
        canvasHeight = height;
        stateEmitter.emit(MENU_STATES.DIMENSION_SELECT);
    })
    .on(MENU_STATES.MAIN_MENU, async ({ clearScreen = true } = {}) => {
        if (clearScreen) clearConsole();
        printMenu(mainMenuOptions);
        const userInput = await ask('Aktion auswählen: ');
        const nextState = (mainMenuOptions.find(({ idx }) => idx === userInput) || {}).nextState;
        if (!nextState) return invalidOptionSelected(userInput, MENU_STATES.MAIN_MENU);
        stateEmitter.emit(nextState);
    })
    .on(MENU_STATES.CREATE_GEOMETRY, async ({ clearScreen = true } = {}) => {
        rectangleBuffer.clear();
        quadBuffer.clear();
        rhombusBuffer.clear();

        if (clearScreen) clearConsole();
        printMenu(createGeometryOptions);
        const userInput = await ask('Aktion auswählen: ');
        const nextState = (createGeometryOptions.find(({ idx }) => idx === userInput) || {}).nextState;
        if (!nextState) return invalidOptionSelected(userInput, MENU_STATES.CREATE_GEOMETRY);
        stateEmitter.emit(nextState);
    })
    .on(MENU_STATES.GEOMETRY_RECTANGLE_X, async ({ clearScreen = true } = {}) => {
        if (clearScreen) clearConsole();
        const userInput = await ask('Position auf der X Achse eingeben: ');
        const x = parseAsInt(userInput, 'INVALID');
        if (x === 'INVALID') return invalidCoordinateEntered(userInput, MENU_STATES.GEOMETRY_RECTANGLE_X);
        rectangleBuffer.setX(x);
        stateEmitter.emit(MENU_STATES.GEOMETRY_RECTANGLE_Y);
    })
    .on(MENU_STATES.GEOMETRY_RECTANGLE_Y, async ({ clearScreen = true } = {}) => {
        if (clearScreen) clearConsole();
        const userInput = await ask('Position auf der Y Achse eingeben: ');
        const y = parseAsInt(userInput, 'INVALID');
        if (y === 'INVALID') return invalidCoordinateEntered(userInput, MENU_STATES.GEOMETRY_RECTANGLE_Y);
        rectangleBuffer.setY(y);
        stateEmitter.emit(MENU_STATES.GEOMETRY_RECTANGLE_W);
    })
    .on(MENU_STATES.GEOMETRY_RECTANGLE_W, async ({ clearScreen = true } = {}) => {
        if (clearScreen) clearConsole();
        const userInput = await ask('Breite eingeben: ');
        const w = parseAsInt(userInput, 'INVALID');
        if (w === 'INVALID' || w <= 0) return invalidDimensionEntered(userInput, MENU_STATES.GEOMETRY_RECTANGLE_W);
        rectangleBuffer.setW(w);
        stateEmitter.emit(MENU_STATES.GEOMETRY_RECTANGLE_H);
    })
    .on(MENU_STATES.GEOMETRY_RECTANGLE_H, async ({ clearScreen = true } = {}) => {
        if (clearScreen) clearConsole();
        const userInput = await ask('Höhe eingeben: ');
        const h = parseAsInt(userInput, 'INVALID');
        if (h === 'INVALID' || h <= 0) return invalidDimensionEntered(userInput, MENU_STATES.GEOMETRY_RECTANGLE_H);
        geometryState.push(createRectangle(rectangleBuffer.getX(), rectangleBuffer.getY(), rectangleBuffer.getW(), h));
        stateEmitter.emit(MENU_STATES.CREATE_GEOMETRY);
    })
    .on(MENU_STATES.GEOMETRY_QUAD_X, async ({ clearScreen = true } = {}) => {
        if (clearScreen) clearConsole();
        const userInput = await ask('Position auf der X Achse eingeben: ');
        const x = parseAsInt(userInput, 'INVALID');
        if (x === 'INVALID') return invalidCoordinateEntered(userInput, MENU_STATES.GEOMETRY_QUAD_X);
        quadBuffer.setX(x);
        stateEmitter.emit(MENU_STATES.GEOMETRY_QUAD_Y);
    })
    .on(MENU_STATES.GEOMETRY_QUAD_Y, async ({ clearScreen = true } = {}) => {
        if (clearScreen) clearConsole();
        const userInput = await ask('Position auf der Y Achse eingeben: ');
        const y = parseAsInt(userInput, 'INVALID');
        if (y === 'INVALID') return invalidCoordinateEntered(userInput, MENU_STATES.GEOMETRY_QUAD_Y);
        quadBuffer.setY(y);
        stateEmitter.emit(MENU_STATES.GEOMETRY_QUAD_W);
    })
    .on(MENU_STATES.GEOMETRY_QUAD_W, async ({ clearScreen = true } = {}) => {
        if (clearScreen) clearConsole();
        const userInput = await ask('Breite eingeben: ');
        const w = parseAsInt(userInput, 'INVALID');
        if (w === 'INVALID' || w <= 0) return invalidDimensionEntered(userInput, MENU_STATES.GEOMETRY_QUAD_W);
        geometryState.push(createQuad(quadBuffer.getX(), quadBuffer.getY(), w));
        stateEmitter.emit(MENU_STATES.CREATE_GEOMETRY);
    })
    .on(MENU_STATES.GEOMETRY_RHOMBUS_X, async ({ clearScreen = true } = {}) => {
        if (clearScreen) clearConsole();
        const userInput = await ask('Position auf der X Achse eingeben: ');
        const x = parseAsInt(userInput, 'INVALID');
        if (x === 'INVALID') return invalidCoordinateEntered(userInput, MENU_STATES.GEOMETRY_RHOMBUS_X);
        rhombusBuffer.setX(x);
        stateEmitter.emit(MENU_STATES.GEOMETRY_RHOMBUS_Y);
    })
    .on(MENU_STATES.GEOMETRY_RHOMBUS_Y, async ({ clearScreen = true } = {}) => {
        if (clearScreen) clearConsole();
        const userInput = await ask('Position auf der Y Achse eingeben: ');
        const y = parseAsInt(userInput, 'INVALID');
        if (y === 'INVALID') return invalidCoordinateEntered(userInput, MENU_STATES.GEOMETRY_RHOMBUS_Y);
        rhombusBuffer.setY(y);
        stateEmitter.emit(MENU_STATES.GEOMETRY_RHOMBUS_H);
    })
    .on(MENU_STATES.GEOMETRY_RHOMBUS_H, async ({ clearScreen = true } = {}) => {
        if (clearScreen) clearConsole();
        const userInput = await ask('Höhe eingeben: ');
        const h = parseAsInt(userInput, 'INVALID');
        if (h === 'INVALID' || h <= 0) return invalidDimensionEntered(userInput, MENU_STATES.GEOMETRY_RHOMBUS_H);
        if (h % 2 === 0) return invalidRhombusHeightEntered(MENU_STATES.GEOMETRY_RHOMBUS_H);
         geometryState.push(createRhombus(rhombusBuffer.getX(), rhombusBuffer.getY(), h));
        stateEmitter.emit(MENU_STATES.CREATE_GEOMETRY);
    })
    .on(MENU_STATES.DELETE_GEOMETRY, async ({ clearScreen = true } = {}) => {
        if (clearScreen) clearConsole();
        const deleteOptions = getDeleteGeometryOptions(geometryState);
        if (deleteOptions.length <= 1) return deleteWithEmptyObjects();

        printMenu(deleteOptions);
        const userInput = await ask('Aktion auswählen: ');        
        const nextState = (deleteOptions.find(({ idx }) => idx === userInput) || {}).nextState;
        if (!nextState) return invalidOptionSelected(userInput, MENU_STATES.DELETE_GEOMETRY);
        geometryState = geometryState.filter((g, idx) => String(idx) !== userInput);
        stateEmitter.emit(nextState);
    })
    .on(MENU_STATES.SHOW_CANVAS, async ({ clearScreen = true } = {}) => {        
        if (!canvasWidth && !canvasHeight) {
            console.log('Die Breite und Höhe vom Zeichenfeld wurde noch nicht festgelegt');
            return stateEmitter.emit(MENU_STATES.MAIN_MENU, { clearScreen: false });
        }
        if (!canvasWidth) {
            console.log('Die Breite vom Zeichenfeld wurde noch nicht festgelegt');
            return stateEmitter.emit(MENU_STATES.MAIN_MENU, { clearScreen: false });
        }
        if (!canvasHeight) {
            console.log('Die Höhe vom Zeichenfeld wurde noch nicht festgelegt');
            return stateEmitter.emit(MENU_STATES.MAIN_MENU, { clearScreen: false });
        }

        if (clearScreen) clearConsole();
        printCanvas(canvasWidth, canvasHeight, geometryState);
        stateEmitter.emit(MENU_STATES.MAIN_MENU, { clearScreen: false });
    });

    stateEmitter.emit(MENU_STATES.MAIN_MENU);
})();