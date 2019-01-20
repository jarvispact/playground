const { expect } = require('chai');
const infixToAst = require('./infix-to-ast');

describe('infix-to-ast', () => {
    it('should convert a simple infix expression with integers to a AST', () => {
        const ast = infixToAst('1 + 3');
        expect(ast).to.eql({
            operator: '+',
            left: '1',
            right: '3',
        });
    });

    it('should convert a simple infix expression with floats to a AST', () => {
        const ast = infixToAst('1.2 + 3.4');
        expect(ast).to.eql({
            operator: '+',
            left: '1.2',
            right: '3.4',
        });
    });

    it('should convert a simple infix expression with floats (with leading dots) to a AST', () => {
        const ast = infixToAst('.2 + .4');
        expect(ast).to.eql({
            operator: '+',
            left: '.2',
            right: '.4',
        });
    });

    it('should convert a simple infix expression with mixed numbers to a AST', () => {
        const ast = infixToAst('1 + (2.3 - .1)');
        expect(ast).to.eql({
            operator: '+',
            left: '1',
            right: {
                operator: '-',
                left: '2.3',
                right: '.1',
            },
        });
    });

    it('should convert a simple infix expression with variables to a AST', () => {
        const ast = infixToAst('x + y');
        expect(ast).to.eql({
            operator: '+',
            left: 'x',
            right: 'y',
        });
    });

    it('should convert a simple infix expression with mixed numbers and variables to a AST', () => {
        const ast = infixToAst('1 + (2.3 - abc)');
        expect(ast).to.eql({
            operator: '+',
            left: '1',
            right: {
                operator: '-',
                left: '2.3',
                right: 'abc',
            },
        });
    });

    it('should convert a complex infix expression with mixed numbers and variables to a AST', () => {
        const ast = infixToAst('xyZ12S + (4 * (5 - .3 )) - (3 * ( 4.4 / abC))');
        expect(ast).to.eql({
            operator: '+',
            right: {
                operator: '-',
                right: {
                    operator: '*',
                    right: {
                        operator: '/',
                        right: 'abC',
                        left: '4.4',
                    },
                    left: '3',
                },
                left: {
                    operator: '*',
                    right: {
                        operator: '-',
                        right: '.3',
                        left: '5',
                    },
                    left: '4',
                },
            },
            left: 'xyZ12S',
        });
    });
});
