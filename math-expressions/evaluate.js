const operatorMap = {
    '+': (left, right) => left + right,
    '-': (left, right) => left - right,
    '*': (left, right) => left * right,
    '/': (left, right) => left / right,
};

const evaluate = (ast) => {
    const { left, operator, right } = ast;
    const leftValue = typeof left === 'number' ? left : evaluate(left);
    const rightValue = typeof right === 'number' ? right : evaluate(right);
    return operatorMap[operator](leftValue, rightValue);
};

module.exports = evaluate;
