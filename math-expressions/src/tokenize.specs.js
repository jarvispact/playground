const { expect } = require('chai');
const tokenize = require('./tokenize');

describe('tokenize', () => {
    it('should handle a empty expression', () => {
        const tokens = tokenize('');
        expect(tokens).to.eql([]);
    });

    it('should handle a empty expression with only whitespaces', () => {
        const tokens = tokenize('   ');
        expect(tokens).to.eql([' ', ' ', ' ']);
    });

    it('should tokenize 2 single char integers with an operator', () => {
        const tokens = tokenize('1 + 2');
        expect(tokens).to.eql(['1', ' ', '+', ' ', '2']);
    });

    it('should tokenize 2 integers with an operator', () => {
        const tokens = tokenize('10 + 42');
        expect(tokens).to.eql(['10', ' ', '+', ' ', '42']);
    });

    it('should tokenize 2 floats with an operator', () => {
        const tokens = tokenize('1.42 + 42.10');
        expect(tokens).to.eql(['1.42', ' ', '+', ' ', '42.10']);
    });

    it('should tokenize 2 (leading dot) floats with an operator', () => {
        const tokens = tokenize('.42 + .10');
        expect(tokens).to.eql(['.42', ' ', '+', ' ', '.10']);
    });

    it('should tokenize mixed numbers with operators', () => {
        const tokens = tokenize('.42 + .10 - 1 + 34 * 22 / 10.123');
        expect(tokens).to.eql(['.42', ' ', '+', ' ', '.10', ' ', '-', ' ', '1', ' ', '+', ' ', '34', ' ', '*', ' ', '22', ' ', '/', ' ', '10.123']);
    });

    it('should tokenize 2 single char variables with an operator', () => {
        const tokens = tokenize('x + y');
        expect(tokens).to.eql(['x', ' ', '+', ' ', 'y']);
    });

    it('should tokenize 2 variables with an operator', () => {
        const tokens = tokenize('xyz + abc');
        expect(tokens).to.eql(['xyz', ' ', '+', ' ', 'abc']);
    });

    it('should tokenize 2 camelCased variables with an operator', () => {
        const tokens = tokenize('xYZ + abC');
        expect(tokens).to.eql(['xYZ', ' ', '+', ' ', 'abC']);
    });

    it('should tokenize 2 variables (with numbers in name) with an operator', () => {
        const tokens = tokenize('xYZ123 + ab23C');
        expect(tokens).to.eql(['xYZ123', ' ', '+', ' ', 'ab23C']);
    });

    it('should tokenize 2 variables with mixed numbers and an operator', () => {
        const tokens = tokenize('xYZ123 + ab23C - 12 + .23 * 23.676');
        expect(tokens).to.eql(['xYZ123', ' ', '+', ' ', 'ab23C', ' ', '-', ' ', '12', ' ', '+', ' ', '.23', ' ', '*', ' ', '23.676']);
    });

    it('should handle multiple whitespaces in between', () => {
        const tokens = tokenize(' xYZ123 -  12  + .23 ');
        expect(tokens).to.eql([' ', 'xYZ123', ' ', '-', ' ', ' ', '12', ' ', ' ', '+', ' ', '.23', ' ']);
    });

    it('should handle missing whitespaces in between', () => {
        const tokens = tokenize('xYZ123-12+.23');
        expect(tokens).to.eql(['xYZ123', '-', '12', '+', '.23']);
    });

    it('should tokenize parenthesis', () => {
        const tokens = tokenize('1 + (4 - x) * ( 5-var )');
        expect(tokens).to.eql(['1', ' ', '+', ' ', '(', '4', ' ', '-', ' ', 'x', ')', ' ', '*', ' ', '(', ' ', '5', '-', 'var', ' ', ')']);
    });
});
