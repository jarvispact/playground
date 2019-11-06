const { GEOMETRY_TYPES, GEOMETRY_SYMBOLS } = require('./constants');
const { parseAsInt } = require('./utils');

const createQuad = (x, y, w) => ({
    type: GEOMETRY_TYPES.QUAD,
    symbol: GEOMETRY_SYMBOLS.QUAD,
    x: parseAsInt(x),
    y: parseAsInt(y),
    w: parseAsInt(w),
});

const createQuadBuffer = () => {
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

const formatQuad = (quad) => {
    return `${quad.type} - x: "${quad.x}", y: "${quad.y}", w: "${quad.w}"`;
};

const getPixelArrayFromQuad = (quad) =>
    [...new Array(quad.w)].map(() => [... new Array(quad.w)].map(() => quad.symbol));

module.exports = {
    createQuad,
    createQuadBuffer,
    formatQuad,
    getPixelArrayFromQuad,
};