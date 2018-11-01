/* eslint-disable no-param-reassign */
const { isOperator } = require('./utils');

const toAST = (stack = [], tree = {}) => {
    if (isOperator(stack.top())) {
        tree.operator = stack.pop();
        tree.right = isOperator(stack.top()) ? toAST(stack, tree.right) : parseFloat(stack.pop());
        tree.left = isOperator(stack.top()) ? toAST(stack, tree.left) : parseFloat(stack.pop());
    }
    return tree;
};

module.exports = toAST;
