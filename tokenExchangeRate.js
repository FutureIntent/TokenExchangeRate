var fs = require('fs');
const { Web3 } = require("web3");
const tokenCollection = require('./data/tokenData');
var router02Abi = JSON.parse(fs.readFileSync('abi/router02.json'));
var { numDigitsAfterDecimal } = require('./utils/digits');

var web3 = new Web3("https://mainnet.infura.io/v3/be89ea96062a447cb9a2500c4fff8143");

var router02Address = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';  // Router02 Contract Address
const router02Contract = new web3.eth.Contract(router02Abi, router02Address);


const getExchangeRate = async ({ token1, token2, amount }) => {

    const token1Contract = new web3.eth.Contract(tokenCollection.get(token1).abi, tokenCollection.get(token1).address);
    const token2Contract = new web3.eth.Contract(tokenCollection.get(token2).abi, tokenCollection.get(token2).address);

    const token1Decimals = await token1Contract.methods.decimals().call();
    const token2Decimals = await token2Contract.methods.decimals().call();

    const res = await router02Contract.methods.getAmountsOut(BigInt(10) ** token1Decimals, [tokenCollection.get(token1).address, tokenCollection.get(token2).address]).call();
    const outputAmount = res[1];

    const decimalOutputAmount = parseFloat(parseFloat(outputAmount) / (10 ** parseFloat(token2Decimals)));

    const exchangeAmount = parseFloat(amount / 1 * decimalOutputAmount);

    return {
        [token1]: amount,
        [token2]: exchangeAmount
    };
}

const initialise = async () => {

    const exchangeRateObject = {
        token1: 'usdt',
        token2: 'weth',
        amount: 3000 // token1 amount
    };

    const result = await getExchangeRate(exchangeRateObject);
    console.log(result);
}

initialise();