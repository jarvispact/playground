const isNumber = require('./is-number');
const isVariable = require('./is-variable');

module.exports = token => isNumber(token) || isVariable(token);
