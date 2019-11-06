const { CANVAS_SYMBOLS, GEOMETRY_TYPES } = require('./constants');
const { getPixelArrayFromRectangle } = require('./rectangle');
const { getPixelArrayFromQuad } = require('./quad');
const { getPixelArrayFromRhombus } = require('./rhombus');

const setPixelsFromRectangle = (pixels, rectangle) => {
    const rectanglePixels = getPixelArrayFromRectangle(rectangle);

    for (let x = 0; x < rectangle.w; x++) {
        for (let y = 0; y < rectangle.h; y++) {
            if (isWithinCanvas(x, y, pixels, rectangle)) {
                pixels[rectangle.y + y][rectangle.x + x] = rectanglePixels[y][x];
            }
        }
    }
};

const setPixelsFromQuad = (pixels, quad) => {
    const quadPixels = getPixelArrayFromQuad(quad);

    for (let x = 0; x < quad.w; x++) {
        for (let y = 0; y < quad.w; y++) {
            if (isWithinCanvas(x, y, pixels, quad)) {
                pixels[quad.y + y][quad.x + x] = quadPixels[y][x];
            }
        }
    }
};

const setPixelsFromRhombus = (pixels, rhombus) => {
    const rhombusPixels = getPixelArrayFromRhombus(rhombus);

    for (let x = 0; x < rhombus.h; x++) {
        for (let y = 0; y < rhombus.h; y++) {
            if (isWithinCanvas(x, y, pixels, rhombus)) {
                pixels[rhombus.y + y][rhombus.x + x] = rhombusPixels[y][x];
            }
        }
    }
};

const isCorner = (x, y, canvasWidth, canvasHeight) =>
    (x === 0 && y === 0) ||
    (x === canvasWidth - 1 && y === 0) ||
    (x === 0 && y === canvasHeight - 1) ||
    (x === canvasWidth - 1 && y === canvasHeight - 1)

const isHorizontalBorder = (x, y, canvasWidth, canvasHeight) =>
    !isCorner(x, y, canvasWidth, canvasHeight) &&
    (y === 0 || y === canvasHeight - 1)

const isVerticalBorder = (x, y, canvasWidth, canvasHeight) =>
    !isCorner(x, y, canvasWidth, canvasHeight) &&
    (x === 0 || x === canvasWidth - 1)

const isWithinCanvas = (x, y, pixels, geometry) =>
    pixels[geometry.y + y] && pixels[geometry.y + y][geometry.x + x] === ' ';

const printCanvas = (canvasWidth, canvasHeight, geometryState) => {
    const pixels = [...new Array(canvasHeight)].map(() => [...new Array(canvasWidth)].map(() => ' '));

    for (let x = 0; x < canvasWidth; x++) {
        for (let y = 0; y < canvasHeight; y++) {
            if (isCorner(x, y, canvasWidth, canvasHeight)) pixels[y][x] = CANVAS_SYMBOLS.CORNER;
            if (isHorizontalBorder(x, y, canvasWidth, canvasHeight)) pixels[y][x] = CANVAS_SYMBOLS.HORIZONTAL_BORDER;
            if (isVerticalBorder(x, y, canvasWidth, canvasHeight)) pixels[y][x] = CANVAS_SYMBOLS.VERTICAL_BORDER;
        }
    }

    geometryState.forEach((geometry) => {
        if (geometry.type === GEOMETRY_TYPES.RECTANGLE) {
            setPixelsFromRectangle(pixels, geometry);
        }
        if (geometry.type === GEOMETRY_TYPES.QUAD) {
            setPixelsFromQuad(pixels, geometry);
        }
        if (geometry.type === GEOMETRY_TYPES.RHOMBUS) {
            setPixelsFromRhombus(pixels, geometry);
        }
    });

    const joinedPixels = pixels.map(row => row.join('')).join('\n');
    console.log(joinedPixels);
};

module.exports = {
    isCorner,
    isHorizontalBorder,
    isVerticalBorder,
    isWithinCanvas,
    printCanvas,
};