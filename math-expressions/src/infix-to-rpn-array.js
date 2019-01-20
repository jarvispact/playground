const { createStack, isOperand, isOperator, isOpeningParenthesis, isClosingParenthesis, getOperatorPrecedence } = require('../utils');
const tokenize = require('./tokenize');

module.exports = (infixExpression = '') => {
    const tokens = tokenize(infixExpression);
    const stack = createStack();
    const rpn = [];

    tokens.forEach((token) => {
        if (isOperand(token)) {
            rpn.push(token);
        }

        if (isOpeningParenthesis(token)) {
            stack.push(token);
        }

        if (isClosingParenthesis(token)) {
            while (stack.hasElements() && !isOpeningParenthesis(stack.top())) rpn.push(stack.pop());
            stack.pop();
        }

        if (isOperator(token)) {
            const tokenPrecedence = getOperatorPrecedence(token);
            const topStackElementPrecedence = getOperatorPrecedence(stack.top());

            if (tokenPrecedence < topStackElementPrecedence) {
                while (stack.hasElements() && tokenPrecedence <= getOperatorPrecedence(stack.top())) rpn.push(stack.pop());
                stack.push(token);
            } else if (tokenPrecedence > topStackElementPrecedence) {
                stack.push(token);
            } else {
                stack.push(token);
            }
        }
    });

    while (stack.hasElements()) rpn.push(stack.pop());
    return rpn;
};
