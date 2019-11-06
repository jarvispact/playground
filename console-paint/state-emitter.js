const EventEmitter = require('events');

class StateEmitter extends EventEmitter {};
const stateEmitter = new StateEmitter();

module.exports = stateEmitter;