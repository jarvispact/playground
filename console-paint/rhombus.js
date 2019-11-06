const { GEOMETRY_TYPES, GEOMETRY_SYMBOLS } = require('./constants');
const { parseAsInt } = require('./utils');

const createRhombus = (x, y, h) => ({
    type: GEOMETRY_TYPES.RHOMBUS,
    symbol: GEOMETRY_SYMBOLS.RHOMBUS,
    x: parseAsInt(x),
    y: parseAsInt(y),
    h: parseAsInt(h),
});

const createRhombusBuffer = () => {
    let x;
    let y;

    return {
        getX: () => x,
        getY: () => y,
        setX: (val) => { x = val },
        setY: (val) => { y = val },
        clear: () => { x = undefined; y = undefined; },
    };
};

const formatRhombus = (rhombus) => {
    return `${rhombus.type} - x: "${rhombus.x}", y: "${rhombus.y}", h: "${rhombus.h}"`;
};

const createGetRhombusRow = () => {
    let symbolCounter = 1;
    let numOfCharsToAddEachIteration = 2;

    return (rhombus, rowIndex) => {
        const middleRowIndex = (rhombus.h - 1) / 2;

        if (rowIndex === middleRowIndex) {
            symbolCounter -= numOfCharsToAddEachIteration;
            numOfCharsToAddEachIteration *= -1;
            return [...new Array(rhombus.h)].map(() => rhombus.symbol);
        }
        
        const symbols = rhombus.symbol.repeat(symbolCounter);
        symbolCounter += numOfCharsToAddEachIteration;
        const numOfCharsOnEachSide = (rhombus.h - symbols.length) / 2;
        return `${' '.repeat(numOfCharsOnEachSide)}${symbols}${' '.repeat(numOfCharsOnEachSide)}`.split('');
    }
};

const getPixelArrayFromRhombus = (rhombus) => {
    const getRhombusRow = createGetRhombusRow();
    return [...new Array(rhombus.h)].map((_, rowIdx) => getRhombusRow(rhombus, rowIdx));
};

module.exports = {
    createRhombus,
    createRhombusBuffer,
    formatRhombus,
    getPixelArrayFromRhombus,
};