module.exports = (array) => {
    const stack = Array.isArray(array) ? [...array] : [];

    return {
        push: token => stack.push(token),
        pop: () => stack.pop(),
        top: () => stack[stack.length - 1],
        getElements: () => stack,
        hasElements: () => stack.length > 0,
    };
};
