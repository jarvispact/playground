const precedenceMap = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
};

module.exports = operator => precedenceMap[operator];
