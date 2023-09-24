// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract FOW_transaction {
    function send(address _addr, uint256 _value) payable public {
        require(msg.value >= _value, "Insufficient funds");
        payable(address(_addr)).transfer(msg.value);
    } 
}
