const readline = require('readline');

const ask = (question) => new Promise((resolve) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.question(question, (answer) => {
        rl.close();
        resolve(answer.trim());
    });
});

module.exports = ask;