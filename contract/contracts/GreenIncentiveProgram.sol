pragma solidity ^0.5.8;

contract GreenIncentiveProgram {

    struct GreenAsset{
        string name;
        string location; //location of the asset
    }

    address payable public owner; 
    string propertyLocation; //location of the owner of the property

    mapping(address => GreenAsset[]) public greenAssets;
    mapping(address => uint) public balance;
    
    modifier ownerOnly(){
        if(msg.sender != owner) revert();
        _;
    }

    constructor() public{

    }

    function addUser(string memory location) public{
        owner = msg.sender;
        propertyLocation = location;
    }

    function addGreenAsset(string memory name, string memory location, address sender) public returns(bool){
        GreenAsset memory incomingGreenAsset = GreenAsset(name, location);
        greenAssets[sender].push(incomingGreenAsset);
        balance[sender] += 98;
        return true;
    }

    function getNumberofGreenAssets(address sender) public view returns (uint){
        return greenAssets[sender].length;
    }

    function getLocation() public view returns (string memory) {
        return propertyLocation;
    }

    function getBalance(address sender) public view returns (uint) {
        return balance[sender];
    }

    function withdraw(uint amount) ownerOnly public {
        if(amount > address(this).balance) revert();
        owner.transfer(amount);
    }

    function deposit() external payable {
        //amount of ether sent in msg.value is added to wallet
    }

    function destroy() public ownerOnly {
        selfdestruct(owner);
    }
}