const { expect } = require('chai');
const evaluate = require('./evaluate');

describe('evaluate', () => {
    describe('validation step', () => {
        it('should throw an error if 2 or more 1 char integers are found in a row', () => {
            const fn = () => evaluate('1 5');
            expect(fn).to.throw('[E_VALIDATION] found 2 operands in a row at token: "5"');
        });

        it('should throw an error if 2 or more operators are found in a row', () => {
            const fn = () => evaluate('+ +');
            expect(fn).to.throw('[E_VALIDATION] found 2 operators in a row at token: "+"');
        });

        it('should throw an error if not all parenthesis were closed', () => {
            const fn = () => evaluate('1 + ( 2 + ( 2 -1 )');
            expect(fn).to.throw('[E_VALIDATION] found more opening parenthesis than closing parenthesis');
        });

        it('should throw an error if too many parenthesis were closed', () => {
            const fn = () => evaluate('1 + ( 2 + ( 2 -1 )))');
            expect(fn).to.throw('[E_VALIDATION] found more closing parenthesis than opening parenthesis');
        });
    });

    describe('only numbers', () => {
        it('should evaluate a simple infix expression with integers', () => {
            const result = evaluate('1 + 3');
            expect(result).to.equal('4');
        });

        it('should evaluate a simple infix expression with floats', () => {
            const result = evaluate('1.2 * 3.1');
            expect(result).to.equal('3.7199999999999998');
        });

        it('should evaluate a simple infix expression with floats and a given precision', () => {
            const result = evaluate('1.2 * 3.1', { precision: 3 });
            expect(result).to.equal('3.720');
        });

        it('should evaluate a simple infix expression with floats (leading dot)', () => {
            const result = evaluate('.2 + .1', { precision: 1 });
            expect(result).to.equal('0.3');
        });

        it('should evaluate a simple infix expression with mixed numbers', () => {
            const result = evaluate('.2 + .1 + 4 + 1.2', { precision: 2 });
            expect(result).to.equal('5.50');
        });

        it('should evaluate a complex infix expression with mixed numbers', () => {
            const result = evaluate('8 + (4 * (5 - 3.3 )) - (3 * ( 4.4 / 2))', { precision: 2 });
            expect(result).to.equal('8.20');
        });
    });

    describe('numbers and variables', () => {
        it('should evaluate a simple infix expression with mixed numbers and variables', () => {
            const result = evaluate('2 + x', { precision: 2, variables: { x: '4' } });
            expect(result).to.equal('6.00');
        });

        it('should evaluate a simple infix expression with mixed numbers and variables', () => {
            const result = evaluate('x + 2', { precision: 2, variables: { x: '4' } });
            expect(result).to.equal('6.00');
        });
    });

    describe('resolve variables', () => {
        it('should evaluate a simple infix expression and resolve the variables', () => {
            const variables = { a: '.2', b: '.1', c: '4', d: '1.2' };
            const result = evaluate('a + b + c + d', { variables, precision: 2 });
            expect(result).to.equal('5.50');
        });

        it('should evaluate a complex infix expression with mixed numbers', () => {
            const variables = { a: '8', b: '4', c: '5', d: '3.3', e: '3', f: '4.4', g: '2' };
            const result = evaluate('a + (b * (c - d )) - (e * ( f / g))', { variables, precision: 2 });
            expect(result).to.equal('8.20');
        });
    });
});
