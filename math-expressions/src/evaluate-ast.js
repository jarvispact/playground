/* eslint-disable no-restricted-globals, no-param-reassign */
const { isOperand, isNumber, isVariable } = require('../utils');

const convertToNumber = (potentialNumber) => {
    const num = parseFloat(potentialNumber);
    return isNaN(num) ? potentialNumber : num;
};

const operatorMap = {
    '+': (left, right) => {
        if (isNumber(left) && isNumber(right)) return convertToNumber(left) + convertToNumber(right);
        if (isVariable(left) || isVariable(right)) return `${left} + ${right}`;
    },
    '-': (left, right) => {
        if (isNumber(left) && isNumber(right)) return convertToNumber(left) - convertToNumber(right);
        if (isVariable(left) || isVariable(right)) return `${left} - ${right}`;
    },
    '*': (left, right) => {
        if (isNumber(left) && isNumber(right)) return convertToNumber(left) * convertToNumber(right);
        if (isVariable(left) || isVariable(right)) return `${left} * ${right}`;
    },
    '/': (left, right) => {
        if (isNumber(left) && isNumber(right)) return convertToNumber(left) / convertToNumber(right);
        if (isVariable(left) || isVariable(right)) return `${left} / ${right}`;
    },
};

const resolveVariables = (ast, variables) => {
    if (!variables) return;
    const astKeys = Object.keys(ast);

    astKeys.forEach((key) => {
        if (typeof ast[key] === 'object') resolveVariables(ast[key], variables);
        if (isVariable(ast[key]) && variables[ast[key]]) ast[key] = variables[ast[key]];
    });
};

const evaluateAst = (ast, { variables, precision }) => {
    const { left, operator, right } = ast;

    const leftValue = isOperand(left) ? left : evaluateAst(left, { variables, precision });
    const rightValue = isOperand(right) ? right : evaluateAst(right, { variables, precision });

    const computedValue = operatorMap[operator](leftValue, rightValue);
    return typeof computedValue === 'number' && precision ? computedValue.toFixed(precision) : computedValue.toString();
};

module.exports = (ast, { variables, precision } = {}) => {
    resolveVariables(ast, variables);
    return evaluateAst(ast, { variables, precision });
};
