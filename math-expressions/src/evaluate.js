const infixToAst = require('./infix-to-ast');
const validate = require('./validate');
const evaluateAst = require('./evaluate-ast');

module.exports = (infixExpression = '', { variables, precision } = {}) => {
    validate(infixExpression);
    const ast = infixToAst(infixExpression);
    return evaluateAst(ast, { variables, precision });
};
