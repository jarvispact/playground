const { createStack, isOperand, isOperator, isOpeningParenthesis, isClosingParenthesis, getPrecedence } = require('./utils');

module.exports = (tokens) => {
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
            const tokenPrecedence = getPrecedence(token);
            const topStackElementPrecedence = getPrecedence(stack.top());

            if (tokenPrecedence < topStackElementPrecedence) {
                while (stack.hasElements() && tokenPrecedence <= getPrecedence(stack.top())) rpn.push(stack.pop());
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
