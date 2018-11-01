const { expect } = require('chai');
const { Expression } = require('./');

describe('Expression', () => {
    it('should create a new Expression Instance', () => {
        const expression = new Expression('1 + 5');
        expect(expression.infixExpression).to.equal('1 + 5');
    });

    it('should be able to set the infix expression with "setInfixExpression()"', () => {
        const expression = new Expression();
        expression.setInfixExpression('1 + 5');
        expect(expression.infixExpression).to.equal('1 + 5');
    });

    describe('expression.tokenize', () => {
        it('should tokenize a simple infix expression', () => {
            const expression = new Expression('1 + 5');
            const tokens = expression.tokenize();
            expect(tokens).to.eql(['1', '+', '5']);
        });

        it('should tokenize a simple infix expression with float values (dot separated)', () => {
            const expression = new Expression('1.2 + 5.3');
            const tokens = expression.tokenize();
            expect(tokens).to.eql(['1.2', '+', '5.3']);
        });

        it('should tokenize a simple infix expression with float values (comma separated)', () => {
            const expression = new Expression('1,2 + 5,3');
            const tokens = expression.tokenize();
            expect(tokens).to.eql(['1.2', '+', '5.3']);
        });

        it('should ignore multiple whitespaces in a row on tokenization', () => {
            const expression = new Expression(' 1  +   5 ');
            const tokens = expression.tokenize();
            expect(tokens).to.eql(['1', '+', '5']);
        });

        it('should handle missing whitespaces on tokenization', () => {
            const expression = new Expression('1.2+5');
            const tokens = expression.tokenize();
            expect(tokens).to.eql(['1.2', '+', '5']);
        });

        it('should tokenize a complex infix expression', () => {
            const expression = new Expression('8 + (4 * (5 - 3.3 )) - (3 * ( 4,4 / 2))');
            const tokens = expression.tokenize();
            const expectedTokens = ['8', '+', '(', '4', '*', '(', '5', '-', '3.3', ')', ')', '-', '(', '3', '*', '(', '4.4', '/', '2', ')', ')'];
            expect(tokens).to.eql(expectedTokens);
        });

        it('should throw a error if two operators in a row are found on tokenization', () => {
            const expression = new Expression('1 + + 5');
            const tokenize = () => expression.tokenize();
            expect(tokenize).to.throw();
        });

        it('should throw a error if two operands in a row are found on tokenization', () => {
            const expression = new Expression('1 5 + 2');
            const tokenize = () => expression.tokenize();
            expect(tokenize).to.throw();
        });

        it('should throw a error if two float operands in a row are found on tokenization', () => {
            const expression = new Expression('1.1 5.5 + 2');
            const tokenize = () => expression.tokenize();
            expect(tokenize).to.throw();
        });

        it('should throw a error if a invalid float notation was found on tokenization', () => {
            const expression = new Expression('1. 5.5 + 2');
            const tokenize = () => expression.tokenize();
            expect(tokenize).to.throw();
        });

        it('should throw a error if a invalid float notation was found on tokenization', () => {
            const expression = new Expression('1.3 .5 + 2');
            const tokenize = () => expression.tokenize();
            expect(tokenize).to.throw();
        });
    });

    describe('expression.toRPN', () => {
        it('should convert a simple infix expression to a expression in rpn notation', () => {
            const expression = new Expression('1 + 3');
            const rpn = expression.toRPN();
            expect(rpn).to.equal('1 3 +');
        });

        it('should convert a simple infix expression with float numbers to a expression in rpn notation', () => {
            const expression = new Expression('1.11 + 3,32');
            const rpn = expression.toRPN();
            expect(rpn).to.equal('1.11 3.32 +');
        });

        it('should convert a complex infix expression with float numbers to a expression in rpn notation', () => {
            const expression = new Expression('8 + (4 * (5 - 3.3 )) - (3 * ( 4,4 / 2))');
            const rpn = expression.toRPN();
            expect(rpn).to.equal('8 4 5 3.3 - * 3 4.4 2 / * - +');
        });
    });

    describe('expression.toAST', () => {
        it('should convert a simple infix expression to a abstract syntax tree', () => {
            const expression = new Expression('1 + 3');
            const ast = expression.toAST();
            expect(ast).to.eql({ operator: '+', left: 1, right: 3 });
        });

        it('should convert a simple infix expression with float numbers to a abstract syntax tree', () => {
            const expression = new Expression('1.11 + 3,32');
            const ast = expression.toAST();
            expect(ast).to.eql({ operator: '+', left: 1.11, right: 3.32 });
        });

        it('should convert a complex infix expression with float numbers to a abstract syntax tree', () => {
            const expression = new Expression('8 + (4 * (5 - 3.3 )) - (3 * ( 4,4 / 2))');
            const ast = expression.toAST();
            const expextedAST = {
                operator: '+',
                right: {
                    operator: '-',
                    right: {
                        operator: '*',
                        right: {
                            operator: '/',
                            right: 2,
                            left: 4.4,
                        },
                        left: 3,
                    },
                    left: {
                        operator: '*',
                        right: {
                            operator: '-',
                            right: 3.3,
                            left: 5,
                        },
                        left: 4,
                    },
                },
                left: 8,
            };
            expect(ast).to.eql(expextedAST);
        });
    });

    describe('expression.evaluate', () => {
        it('should evaluate a simple infix expression', () => {
            const expression = new Expression('1 + 3');
            const result = expression.evaluate();
            expect(result).to.equal(4);
        });

        it('should evaluate a simple infix expression with float numbers', () => {
            const expression = new Expression('1.11 + 3,32');
            const result = expression.evaluate();
            expect(result).to.equal(4.43);
        });

        it('should evaluate a complex infix expression with float numbers', () => {
            const expression = new Expression('8 + (4 * (5 - 3.3 )) - (3 * ( 4,4 / 2))');
            const result = expression.evaluate();
            expect(result).to.eql(8.2);
        });
    });
});
