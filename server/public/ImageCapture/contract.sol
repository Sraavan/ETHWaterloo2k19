pragma solidity ^0.5.0;

contract GreenIncentiveProgram {

    struct GreenAsset{
        string name;
        string location; //location of the asset
    }

    address payable public owner; 
    string propertyLocation; //location of the owner of the property

    mapping(address => GreenAsset[]) public greenAssets;

    modifier ownerOnly(){
        if(msg.sender != owner) revert();
        _;
    }

    constructor(string memory location) public{
        owner = msg.sender;
        propertyLocation = location;
    }

    function addGreenAsset(string memory name, string memory location) public ownerOnly{
        GreenAsset memory incomingGreenAsset = GreenAsset(name, location);
        greenAssets[msg.sender].push(incomingGreenAsset);
    }

    function getNumberofGreenAssets() public view returns (uint){
        return greenAssets[msg.sender].length;
    }

    function getLocation() public view returns (string memory) {
        return propertyLocation;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
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