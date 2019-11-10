
var contract;
var greenAssetType = 'Tree';
var latitude = '0.0';
var longitude = '0.0';
var userAddress;

$(document).ready(function() {
    initContract();
})


function initContract() {

    //#region contractAbi
    const contractAbi = [
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "location",
                    "type": "string"
                }
            ],
            "name": "addGreenAsset",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "string",
                    "name": "location",
                    "type": "string"
                }
            ],
            "name": "addUser",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "deposit",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "destroy",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "withdraw",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getBalance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getLocation",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getNumberofGreenAssets",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "greenAssets",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "location",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address payable",
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ]
    //#endregion
    let fm = new Fortmatic('pk_test_E388041C5963490F');
    web3 = new Web3(fm.getProvider());

    
    const contractAddress = "0x861659D970B90C07d9fAA6cff057E4e079e739fc";
    // Create contract object
    contract = new web3.eth.Contract(contractAbi, contractAddress);

    // Get user account wallet address first
    web3.eth.getAccounts(function(error, accounts) {
        if (error) throw error;
        userAddress = accounts[0]
        console.log("UserAddress: ", userAddress)
    });
    
}

function getBalance() {
    contract.methods.getBalance().call().then((result) => {
        $('#balance').html(result);
    })
}

$('#camera--trigger').click(function() {
    getLocation();
    addGreenAsset();
})
//     web3.eth.getAccounts().then(function(accounts) {
//         var acct = accounts[0];
//         return contract.methods.addGreenAsset("Tree", "Toronto").send({from: acct});
//     }).then(function(tx) {
//         console.log(tx);
//         var curr = parseInt($('#balance').html());
//         $('#balance').html(curr);
//     }).catch(function(err) {
//         console.log(err);
//     })
// })

// Implement decrement and reset

var x = document.getElementById("demo");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    latitude = position.coords.latitude
    longitude = position.coords.longitude
    x.innerHTML = "Latitude: " + latitude + 
    "<br>Longitude: " + longitude; 
    
}
        
function addGreenAsset(){
    let sLocation = `${latitude}:${longitude}`
    console.log(userAddress)
    contract.methods.addGreenAsset(greenAssetType, sLocation).call({from: userAddress}, function(err, res){
        if (err){
            console.log(err)
            return;
        }
        console.log("Added Green Asset successfully");
    })
}
