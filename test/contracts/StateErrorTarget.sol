pragma solidity ^0.4.15;


import "../../contracts/Upgradeable.sol";


contract StateErrorTarget is Upgradeable {
    uint256 public intState;
    string public stringState;

    function setStringState(string value) public {
        stringState = value;
    }

    function setIntState(uint256 value) public {
        intState = value;
    }

    function checkAdmin() internal {

    }
}
