var fs = require('fs');
var tokenAbi = JSON.parse(fs.readFileSync('./abi/erc20.json'));

const tokenCollection = new Map();

tokenCollection.set('weth', {
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    abi: tokenAbi
});

tokenCollection.set('usdt', {
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    abi: tokenAbi
});

// xaut doesn't work for some reason
tokenCollection.set('xaut', {
    address: '0x68749665FF8D2d112Fa859AA293F07A622782F38',
    abi: tokenAbi
});

module.exports = tokenCollection;