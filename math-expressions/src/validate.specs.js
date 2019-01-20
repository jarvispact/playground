const { expect } = require('chai');
const validate = require('./validate');

describe('validate', () => {
    describe('2 or more operands in a row', () => {
        it('should throw an error if 2 or more 1 char integers are found in a row', () => {
            const fn = () => validate('1 5 3 4');
            expect(fn).to.throw('[E_VALIDATION] found 2 operands in a row at token: "5"');
        });

        it('should throw an error if 2 or more integers are found in a row', () => {
            const fn = () => validate('11 501 30 42');
            expect(fn).to.throw('[E_VALIDATION] found 2 operands in a row at token: "501"');
        });

        it('should throw an error if 2 or more floats are found in a row', () => {
            const fn = () => validate('1.2 5.123 3.55 4.22');
            expect(fn).to.throw('[E_VALIDATION] found 2 operands in a row at token: "5.123"');
        });

        it('should throw an error if 2 or more floats with leading dot are found in a row', () => {
            const fn = () => validate('.1 .123 .55 .42');
            expect(fn).to.throw('[E_VALIDATION] found 2 operands in a row at token: ".123"');
        });

        it('should throw an error if 2 or more mixed numbers are found in a row', () => {
            const fn = () => validate('1 5.123 .55 4');
            expect(fn).to.throw('[E_VALIDATION] found 2 operands in a row at token: "5.123"');
        });

        it('should throw an error if 2 or more single char variables are found in a row', () => {
            const fn = () => validate('x y z a b c');
            expect(fn).to.throw('[E_VALIDATION] found 2 operands in a row at token: "y"');
        });

        it('should throw an error if 2 or more variables are found in a row', () => {
            const fn = () => validate('xyz yab za asfr bsccd csvfd');
            expect(fn).to.throw('[E_VALIDATION] found 2 operands in a row at token: "yab"');
        });

        it('should throw an error if 2 or more camelCased variables are found in a row', () => {
            const fn = () => validate('xYZ yAb zA aSfR bScCd csvFd');
            expect(fn).to.throw('[E_VALIDATION] found 2 operands in a row at token: "yAb"');
        });

        it('should throw an error if 2 or more camelCased variables with numbers are found in a row', () => {
            const fn = () => validate('xYZ12 yA42b zA aSfR bScCd csvFd');
            expect(fn).to.throw('[E_VALIDATION] found 2 operands in a row at token: "yA42b"');
        });

        // TODO this is legit maybe: 3 x + 4 === 3x + 4
        it('should throw an error if 2 or more variables or numbers are found in a row', () => {
            const fn = () => validate('2.1 yab za asfr bsccd csvfd');
            expect(fn).to.throw('[E_VALIDATION] found 2 operands in a row at token: "yab"');
        });

        // TODO this is legit maybe: x 3 + 4 === x3 + 4 === 3x + 4
        it('should throw an error if 2 or more variables or numbers are found in a row', () => {
            const fn = () => validate('yab 2.1 za asfr bsccd csvfd');
            expect(fn).to.throw('[E_VALIDATION] found 2 operands in a row at token: "2.1"');
        });
    });

    describe('2 or more operators in a row', () => {
        it('should throw an error if 2 or more operators are found in a row (1)', () => {
            const fn = () => validate('+ + - -');
            expect(fn).to.throw('[E_VALIDATION] found 2 operators in a row at token: "+"');
        });

        it('should throw an error if 2 or more operators are found in a row (2)', () => {
            const fn = () => validate('+ - * /');
            expect(fn).to.throw('[E_VALIDATION] found 2 operators in a row at token: "-"');
        });

        it('should throw an error if 2 or more operators are found in a row (3)', () => {
            const fn = () => validate('* / - +');
            expect(fn).to.throw('[E_VALIDATION] found 2 operators in a row at token: "/"');
        });

        it('should throw an error if 2 or more operators without whitespace are found in a row', () => {
            const fn = () => validate('*/-+');
            expect(fn).to.throw('[E_VALIDATION] found 2 operators in a row at token: "/"');
        });
    });

    describe('invalid parenthesis order/count', () => {
        it('should throw an error if not all parenthesis were closed', () => {
            const fn = () => validate('1 + ( 2 + ( 2 -1 )');
            expect(fn).to.throw('[E_VALIDATION] found more opening parenthesis than closing parenthesis');
        });

        it('should throw an error if too many parenthesis were closed', () => {
            const fn = () => validate('1 + ( 2 + ( 2 -1 )))');
            expect(fn).to.throw('[E_VALIDATION] found more closing parenthesis than opening parenthesis');
        });
    });
});
