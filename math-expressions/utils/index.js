const precedenceMap = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
};

const createStack = (array) => {
    const stack = Array.isArray(array) ? [...array] : [];

    return {
        push: token => stack.push(token),
        pop: () => stack.pop(),
        top: () => stack[stack.length - 1],
        getElements: () => stack,
        hasElements: () => stack.length > 0,
    };
};

module.exports = {
    isOperator: token => ['+', '-', '*', '/'].includes(token),
    isOperand: token => /^(\d+|\d+.\d+)$/.test(token),
    isNumber: token => /^\d+$/.test(token),
    isDot: token => token === '.',
    isComma: token => token === ',',
    isOpeningParenthesis: token => token === '(',
    isClosingParenthesis: token => token === ')',
    getPrecedence: operator => precedenceMap[operator],
    isEmptyString: (token = '') => token.trim() === '',
    replaceCommasWithDots: token => token.replace(',', '.'),
    createStack,
};
