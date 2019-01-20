# math-expressions
a math expression parser that supports variables and the following operators:

- `+` addition
- `-` subtraction
- `*` multiplication
- `/` division

## examples:

```javascript
const { evaluate } = require('./src/evaluate');

// only with number literals
const result = evaluate('1 + 5 - 2'); // result === '4'

// with variables
const variables = { a: '1', b: '5', c: '2' };
const result = evaluate('a + b - c', { variables }); // result === '4'

// with variables and a custom precision
const variables = { a: '1', b: '5', c: '2' };
const precision = 3;
const result = evaluate('a + b - c', { variables, precision }); // result === '4.000'
```

```javascript
const { infixToAst } = require('./src/infix-to-ast');

const result = infixToAst('1 + 5 - 2'); // produces a AST (abstract syntax tree)
```

```javascript
const { infixToRpn } = require('./src/infix-to-rpn');

const result = infixToRpn('1 + 3'); // result === '1 3 +'
```

```javascript
const { tokenize } = require('./src/tokenize');

const result = tokenize('1 + 3'); // result === ['1', ' ', '+', ' ', '3']
```

```javascript
const { validate } = require('./src/validate');

const result = validate('1 3'); // will throw a error
const result = validate('+ +'); // will throw a error
const result = validate('(()'); // will throw a error
const result = validate('())'); // will throw a error
const result = validate('1 + 3'); // will return nothing (validation ok)
```