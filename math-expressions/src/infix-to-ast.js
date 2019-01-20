/* eslint-disable no-param-reassign */

const { createStack, isOperator } = require('../utils');
const infixToRpnArray = require('./infix-to-rpn-array');

const toAST = (stack = [], tree = {}) => {
    if (isOperator(stack.top())) {
        tree.operator = stack.pop();
        tree.right = isOperator(stack.top()) ? toAST(stack, tree.right) : stack.pop();
        tree.left = isOperator(stack.top()) ? toAST(stack, tree.left) : stack.pop();
    }
    return tree;
};

module.exports = (infixExpression = '') => {
    const rpn = infixToRpnArray(infixExpression);
    const stack = createStack(rpn);
    return toAST(stack);
};
