const { GEOMETRY_TYPES, GEOMETRY_SYMBOLS } = require('./constants');
const { parseAsInt } = require('./utils');

const createRectangle = (x, y, w, h) => ({
    type: GEOMETRY_TYPES.RECTANGLE,
    symbol: GEOMETRY_SYMBOLS.RECTANGLE,
    x: parseAsInt(x),
    y: parseAsInt(y),
    w: parseAsInt(w),
    h: parseAsInt(h),
});

const createRectangleBuffer = () => {
    let x;
    let y;
    let w;

    return {
        getX: () => x,
        getY: () => y,
        getW: () => w,
        setX: (val) => { x = val },
        setY: (val) => { y = val },
        setW: (val) => { w = val },
        clear: () => { x = undefined; y = undefined; w = undefined },
    };
};

const formatRectangle = (rectangle) => {
    return `${rectangle.type} - x: "${rectangle.x}", y: "${rectangle.y}", w: "${rectangle.w}", h: "${rectangle.h}"`;
};

const getPixelArrayFromRectangle = (rectangle) =>
    [...new Array(rectangle.h)].map(() => [... new Array(rectangle.w)].map(() => rectangle.symbol));

module.exports = {
    createRectangle,
    createRectangleBuffer,
    formatRectangle,
    getPixelArrayFromRectangle,
};