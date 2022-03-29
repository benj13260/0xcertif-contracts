//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./gallery.sol";

contract Galleries {

    Gallery[] public galleries;

    function createChildContract(string memory name, string memory sym) public 
    returns (Gallery tokenAddress) {
        // check if the sent ether is enough to cover the car asset ...
        Gallery g = new Gallery(name, sym); //, 200, msg.sender);
        g.transferOwnership(msg.sender);
        galleries.push(g);
        return g;
    }

    function getDeployedChildContracts() public view returns (Gallery[] memory holder) {
        return galleries;
    }
    

}
