const { isDot, isOperand } = require('../utils');

module.exports = (infixExpression = '') => {
    const expressionAsArray = infixExpression.split('');
    const tokens = [];
    let operandBuffer = [];

    const flushOperandBuffer = () => {
        tokens.push(operandBuffer.join(''));
        operandBuffer = [];
    };

    expressionAsArray.forEach((character) => {
        if (!isOperand(character) && !isDot(character)) {
            if (operandBuffer.length) flushOperandBuffer();
            tokens.push(character);
        } else {
            operandBuffer.push(character);
        }
    });

    if (operandBuffer.length) flushOperandBuffer();
    return tokens;
};
