const { expect } = require('chai');
const infixToRpn = require('./infix-to-rpn');

describe('infix-to-rpn', () => {
    it('should convert a simple infix expression to a expression in rpn notation', () => {
        const rpn = infixToRpn('1 + 3');
        expect(rpn).to.equal('1 3 +');
    });

    it('should convert a simple infix expression with float numbers to a expression in rpn notation', () => {
        const rpn = infixToRpn('1.11 + 3.32');
        expect(rpn).to.equal('1.11 3.32 +');
    });

    it('should convert a simple infix expression with variables to a expression in rpn notation', () => {
        const rpn = infixToRpn('abc + xyz');
        expect(rpn).to.equal('abc xyz +');
    });

    it('should convert a simple infix expression with mixed values to a expression in rpn notation', () => {
        const rpn = infixToRpn('abc + 42.42');
        expect(rpn).to.equal('abc 42.42 +');
    });

    it('should convert a simple infix expression with mixed camelCased and leading dot values to a expression in rpn notation', () => {
        const rpn = infixToRpn('abC123dF + .42');
        expect(rpn).to.equal('abC123dF .42 +');
    });

    it('should convert a complex infix expression with float numbers to a expression in rpn notation', () => {
        const rpn = infixToRpn('8 + (abc * (5 - .3 )) - (a123D * ( .4 / 2))');
        expect(rpn).to.equal('8 abc 5 .3 - * a123D .4 2 / * - +');
    });
});
