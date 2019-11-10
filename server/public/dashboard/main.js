let fm = new Fortmatic('pk_test_91F2D5940DD00CD3');
web3 = new Web3(fm.getProvider());

let handleSendTransaction = function (amount, address) {
    web3.eth.sendTransaction({
        // From address will automatically be replaced by the address of current user
        from: '0x0000000000000000000000000000000000000000',
        to: address,
        value: web3.utils.toWei(amount, 'ether')
    });
};

// Initialize elements and events (no need to change)
const defaultAmount = 0.01;
const defaultAddress = '0x22b05d73097c0a2440d29af61db4b4ed3803e55e';
const inputAmount = document.getElementById('input-amount');
inputAmount.setAttribute('placeholder', defaultAmount);
inputAmount.setAttribute('value', defaultAmount);
const inputAddress = document.getElementById('input-address');
inputAddress.setAttribute('placeholder', defaultAddress);
inputAddress.innerText = defaultAddress;
document.getElementById('btn-send').onclick = function () {
    let amount = inputAmount.value ? inputAmount.value : defaultAmount;
    let address = inputAddress.value ? inputAddress.value : defaultAddress;
    handleSendTransaction(amount, address);
};
