const { isNumber, isDot, isComma, isEmptyString, replaceCommasWithDots } = require('./utils');

const validateExpression = (infixExpression) => {
    const doubleOperandCheck = infixExpression.match(/\d\s(\d)/);
    if (doubleOperandCheck) throw new Error(`[E_PARSE_ERROR] found 2 operands in a row at operand: "${doubleOperandCheck[1]}"`);
    const doubleOperatorCheck = infixExpression.match(/(\+|-|\*|\/)\s(\+|-|\*|\/)/);
    if (doubleOperatorCheck) throw new Error(`[E_PARSE_ERROR] found 2 operators in a row at operators: "${doubleOperatorCheck[1]}"`);
};

module.exports = (infixExpression = '') => {
    validateExpression(infixExpression);
    const expressionAsArray = infixExpression.split('').filter(item => !isEmptyString(item));
    const tokens = [];
    let numberBuffer = [];

    const isInvalidBuffer = () => numberBuffer.filter(item => isDot(item) || isComma(item)).length > 1;

    const flushNumberBuffer = (item) => {
        const lastElement = numberBuffer[numberBuffer.length - 1];
        if (isInvalidBuffer()) throw new Error(`[E_PARSE_ERROR] found more than 1 separator. invalid numberBuffer: "${numberBuffer.join(', ')}"`);
        if (isDot(numberBuffer[0]) || isComma(numberBuffer[0])) throw new Error(`[E_PARSE_ERROR] invalid float notation found at token: "${item}"`);
        if (isDot(lastElement) || isComma(lastElement)) throw new Error(`[E_PARSE_ERROR] invalid float notation found at token: "${item}"`);
        tokens.push(numberBuffer.join(''));
        numberBuffer = [];
    };

    expressionAsArray.forEach((item) => {
        if (isNumber(item) || isDot(item) || isComma(item)) numberBuffer.push(item);

        if (!isNumber(item) && !isDot(item) && !isComma(item)) {
            if (numberBuffer.length) flushNumberBuffer(item);
            tokens.push(item);
        }
    });

    if (numberBuffer.length) tokens.push(numberBuffer.join(''));
    return tokens.map(replaceCommasWithDots);
};
