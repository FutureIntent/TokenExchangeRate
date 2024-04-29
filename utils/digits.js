
const numDigitsAfterDecimal = (number) => {
    var afterDecimalStr = number.toString().split('.')[1] || null;
    return afterDecimalStr.length;
}

module.exports = {
    numDigitsAfterDecimal
};