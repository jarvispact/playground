const MENU_STATES = {
    DIMENSION_SELECT: 'dimension-select',
    DIMENSION_SELECT_WIDTH: 'dimension-select-width',
    DIMENSION_SELECT_HEIGHT: 'dimension-select-height',
    MAIN_MENU: 'main-menu',
    CREATE_GEOMETRY: 'create-geometry',
    DELETE_GEOMETRY: 'delete-geometry',
    SHOW_CANVAS: 'show-canvas',
    GEOMETRY_RECTANGLE_X: 'geometry-rectangle-x',
    GEOMETRY_RECTANGLE_Y: 'geometry-rectangle-y',
    GEOMETRY_RECTANGLE_W: 'geometry-rectangle-w',
    GEOMETRY_RECTANGLE_H: 'geometry-rectangle-h',
    GEOMETRY_QUAD_X: 'geometry-quad-x',
    GEOMETRY_QUAD_Y: 'geometry-quad-y',
    GEOMETRY_QUAD_W: 'geometry-quad-w',
    GEOMETRY_RHOMBUS_X: 'geometry-rhombus-x',
    GEOMETRY_RHOMBUS_Y: 'geometry-rhombus-y',
    GEOMETRY_RHOMBUS_H: 'geometry-rhombus-h',
    EXIT_MENU: 'exit-menu',
};

const GEOMETRY_TYPES = {
    RECTANGLE: 'rectangle',
    QUAD: 'quad',
    RHOMBUS: 'rhombus',
};

const GEOMETRY_SYMBOLS = {
    RECTANGLE: '=',
    QUAD: '*',
    RHOMBUS: '#',
};

const CANVAS_SYMBOLS = {
    CORNER: '+',
    HORIZONTAL_BORDER: '-',
    VERTICAL_BORDER: '|'
};

module.exports = {
    MENU_STATES,
    GEOMETRY_TYPES,
    GEOMETRY_SYMBOLS,
    CANVAS_SYMBOLS,
};