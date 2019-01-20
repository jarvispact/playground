const infixToRpnArray = require('./infix-to-rpn-array');

module.exports = infixExpression => infixToRpnArray(infixExpression).join(' ');
