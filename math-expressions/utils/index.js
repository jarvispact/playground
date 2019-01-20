const createStack = require('./create-stack');
const getOperatorPrecedence = require('./get-operator-precedence');
const isClosingParenthesis = require('./is-closing-parenthesis');
const isDot = require('./is-dot');
const isNumber = require('./is-number');
const isOpeningParenthesis = require('./is-opening-parenthesis');
const isOperand = require('./is-operand');
const isOperator = require('./is-operator');
const isVariable = require('./is-variable');
const isWhitespace = require('./is-whitespace');

module.exports = {
    createStack,
    getOperatorPrecedence,
    isClosingParenthesis,
    isDot,
    isNumber,
    isOpeningParenthesis,
    isOperand,
    isOperator,
    isVariable,
    isWhitespace,
};
