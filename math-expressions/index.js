const tokenize = require('./tokenize');
const toRPN = require('./to-rpn');
const toAST = require('./to-ast');
const evaluate = require('./evaluate');
const { createStack } = require('./utils');

const Expression = class {
    constructor(infixExpression) {
        this.infixExpression = infixExpression;
    }

    setInfixExpression(infixExpression) {
        this.infixExpression = infixExpression;
    }

    tokenize() {
        return tokenize(this.infixExpression);
    }

    toRPN() {
        const tokens = tokenize(this.infixExpression);
        return toRPN(tokens).join(' ');
    }

    toAST() {
        const tokens = tokenize(this.infixExpression);
        const rpnArray = toRPN(tokens);
        const stack = createStack(rpnArray);
        return toAST(stack);
    }

    evaluate() {
        const ast = this.toAST();
        return evaluate(ast);
    }
};

module.exports = { Expression };
