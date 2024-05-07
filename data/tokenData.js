var fs = require('fs');
var tokenAbi = JSON.parse(fs.readFileSync('./abi/erc20.json'));

const tokenCollection = new Map();

tokenCollection.set('WETH', {
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    abi: tokenAbi
});

tokenCollection.set('USDT', {
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    abi: tokenAbi
});

tokenCollection.set('USDC', {
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    abi: tokenAbi
});

tokenCollection.set('BNB', {
    address: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52',
    abi: tokenAbi
});

tokenCollection.set('SHIB', {
    address: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
    abi: tokenAbi
});

tokenCollection.set('TONCOIN', {
    address: '0x582d872A1B094FC48F5DE31D3B73F2D9bE47def1',
    abi: tokenAbi
});

tokenCollection.set('XAUT', {
    address: '0x68749665FF8D2d112Fa859AA293F07A622782F38',
    abi: tokenAbi
});

module.exports = tokenCollection;