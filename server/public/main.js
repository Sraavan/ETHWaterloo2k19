App = {
    loading: false,
    contracts: {},
    fm: new Fortmatic('pk_test_E388041C5963490F'),

    load: async () => {
        await App.loadWeb3()
        await App.loadAccount()
        await App.loadContract()
    },

    loadWeb3: async () => {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider
            web3 = new Web3(web3.currentProvider)
        } else {
            window.alert("Please connect to Metamask.")
        }
        // Modern dapp browsers...
        if (window.ethereum) {
            window.web3 = new Web3(ethereum)
            try {
                await ethereum.enable()
                // web3.eth.sendTransaction({/* ... */ })
            } catch (error) {
                // User denied account access...
            }
        } else {
            window.web3 = new Web3(fm.getProvider());
        }
        
        // Legacy dapp browsers...
        if (window.web3) {
            App.web3Provider = web3.currentProvider
            window.web3 = new Web3(web3.currentProvider)
            // web3.eth.sendTransaction({/* ... */ })
        }
        // Non-dapp browsers...
        else {
            App.web3Provider = fm.getProvider()
            window.web3 = new Web3(fm.getProvider());
            // console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    },

    loadAccount: async () => {
        // Set the current blockchain account
        App.account = web3.eth.accounts[0]
    },

    loadContract: async () => {
        // Create a JavaScript version of the smart contract
        const greenContract = await $.getJSON(`/contracts/GreenIncentiveProgram.json`)
        App.contracts.GreenContract = TruffleContract(greenContract)
        App.contracts.GreenContract.setProvider(App.web3Provider)

        // Hydrate the smart contract with values from the blockchain
        App.greenContract = await App.contracts.GreenContract.deployed()
    },

    getBalance: async () => {
        const balance = await App.greenContract.balance(App.account)
        alert(`Balance: ${balance}`)
    },

    getImage: async() => {
        document.location.href = '../ImageCapture';
    },

    getNumberOfAssets: async() => {
        const res = await App.greenContract.getNumberofGreenAssets(App.account)
        alert(`Assets: ${res}`)
    },

    addGreenAsset: async(latitude, longitude) => {
        let sLocation = `${latitude}:${longitude}`
        const res = await App.greenContract.addGreenAsset('Tree', sLocation, App.account)
        alert(`Green: ${res}`)
    },

    logout: async() => {
        App.fm.user.logout();
        document.location.href = '../Login';
    }

}

$(() => {
    $(window).load(() => {
        App.load()
    })
})

