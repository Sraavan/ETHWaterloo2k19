// Initialize provider
import Fortmatic from 'fortmatic';
import Web3 from 'web3';

const fm = new Fortmatic('pk_test_91F2D5940DD00CD3');
window.web3 = new Web3(fm.getProvider());

// Get the contract ABI from compiled smart contract json
const erc20TokenContractAbi = [{ "constant": true, "inputs": [], "name": "getBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "name": "greenAssets", "outputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "location", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getNumberofGreenAssets", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "destroy", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "internalType": "address payable", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "location", "type": "string" }], "name": "addGreenAsset", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getLocation", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "deposit", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "location", "type": "string" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }]
// Create contract object
const tokenContract = web3.eth.contract(erc20TokenContractAbi);
// Instantiate contract
const tokenContractInstance = tokenContract.at('0xd5501A1C6851e6C9F9c8E9e38DDA52bc9fa32bbB');

// const toAddress = '0xE0cef4417a772512E6C95cEf366403839b0D6D6D';
// // Calculate contract compatible value for transfer with proper decimal points using BigNumber
// const tokenDecimals = web3.toBigNumber(18);
// const tokenAmountToTransfer = web3.toBigNumber(100);
// const calculatedTransferValue = web3.toHex(tokenAmountToTransfer.mul(web3.toBigNumber(10).pow(tokenDecimals)));

// Call contract function (non-state altering) to get total token supply
tokenContractInstance.addGreenAsset.call("Tree", "Toronto", function (error, result) {
  if (error) throw error;
  console.log(result);
});

// Get user account wallet address first
web3.eth.getAccounts(function (error, accounts) {
  if (error) throw error;
  // Send ERC20 transaction with web3
  tokenContractInstance.transfer.sendTransaction(toAddress, calculatedTransferValue, { from: accounts[0] }, (error, txnHash) => {
    if (error) throw error;
    console.log(txnHash);
  });
});