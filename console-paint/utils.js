const parseAsInt = (val, defaultValue = 0) => {
    const parsed = Number.parseInt(val, 10);
    return Number.isNaN(parsed) ? defaultValue : parsed;
};

module.exports = {
    parseAsInt,
};