/* eslint-disable no-plusplus */
const { isNumber, isVariable, isWhitespace, isOperator, isOpeningParenthesis, isClosingParenthesis } = require('../utils');
const tokenize = require('./tokenize');

const operandsInARowCheck = (lastToken, currentToken) => {
    const lastTokenIsOperand = lastToken && (isNumber(lastToken) || isVariable(lastToken));
    const currentTokenIsOperand = isNumber(currentToken) || isVariable(currentToken);

    if (lastTokenIsOperand && currentTokenIsOperand) {
        throw new Error(`[E_VALIDATION] found 2 operands in a row at token: "${currentToken}"`);
    }
};

const operatorsInARowCheck = (lastToken, currentToken) => {
    if (isOperator(lastToken) && isOperator(currentToken)) {
        throw new Error(`[E_VALIDATION] found 2 operators in a row at token: "${currentToken}"`);
    }
};

const parenthesisCountCheck = (tokens) => {
    let level = 0;

    tokens.forEach((token) => {
        if (isOpeningParenthesis(token)) level++;
        if (isClosingParenthesis(token)) level--;
    });

    if (level > 0) throw new Error('[E_VALIDATION] found more opening parenthesis than closing parenthesis');
    if (level < 0) throw new Error('[E_VALIDATION] found more closing parenthesis than opening parenthesis');
};

module.exports = (infixExpression = '') => {
    const tokens = tokenize(infixExpression).filter(token => !isWhitespace(token));
    let lastToken;

    tokens.forEach((token) => {
        operandsInARowCheck(lastToken, token);
        operatorsInARowCheck(lastToken, token);
        lastToken = token;
    });

    parenthesisCountCheck(tokens);
};
