var fs = require('fs');
const { Web3 } = require("web3");
const tokenCollection = require('./data/tokenData');
var V3FactoryAbi = JSON.parse(fs.readFileSync('./abi/V3Factory.json'));
var V3PoolAbi = JSON.parse(fs.readFileSync('./abi/V3Pool.json'));

var web3 = new Web3("https://mainnet.infura.io/v3/be89ea96062a447cb9a2500c4fff8143");

// 10000 - 1%
var fee = 10000;

const uniswapV3FactoryAddress = '0x1F98431c8aD98523631AE4a59f267346ea31F984';
const uniswapV3Contract = new web3.eth.Contract(V3FactoryAbi, uniswapV3FactoryAddress);


const parceSqrtPriceX96ToDecimal = (sqrtPriceX96, token0Decimals, token1Decimals) => {
    const sqrtPrice = parseFloat(sqrtPriceX96) / 2 ** 96;
    const price = sqrtPrice ** 2;

    const decimalPrice = price / (10 ** parseFloat(token1Decimals) / 10 ** parseFloat(token0Decimals));

    return decimalPrice;
}

const getExchangeRate = async ({ token0, token1, amount }) => {

    const token0Contract = new web3.eth.Contract(tokenCollection.get(token0).abi, tokenCollection.get(token0).address);
    const token1Contract = new web3.eth.Contract(tokenCollection.get(token1).abi, tokenCollection.get(token1).address);

    const token0Decimals = await token0Contract.methods.decimals().call();
    const token1Decimals = await token1Contract.methods.decimals().call();

    const poolAddress = await uniswapV3Contract.methods.getPool(tokenCollection.get(token0).address, tokenCollection.get(token1).address, fee).call();

    const poolContract = new web3.eth.Contract(V3PoolAbi, poolAddress);
    const { sqrtPriceX96 } = await poolContract.methods.slot0().call();

    const poolToken0Address = await poolContract.methods.token0().call();

    if (poolToken0Address === tokenCollection.get(token0).address) {
        const exchangeRate = parceSqrtPriceX96ToDecimal(sqrtPriceX96, token0Decimals, token1Decimals);
        const exchangeAmount = amount / 1 * exchangeRate;

        return {
            [token0]: amount,
            [token1]: exchangeAmount
        };
    }

    const exchangeRate = parceSqrtPriceX96ToDecimal(sqrtPriceX96, token1Decimals, token0Decimals);
    const exchangeAmount = amount * 1 / exchangeRate;

    return {
        [token0]: amount,
        [token1]: exchangeAmount
    };
}

const initialise = async () => {

    const exchangeRateObject = {
        token0: 'WETH',
        token1: 'SHIB',
        amount: 1.5 // token0 amount
    };

    const result = await getExchangeRate(exchangeRateObject);
    console.log(result);
}

initialise();