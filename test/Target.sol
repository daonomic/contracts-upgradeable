pragma solidity 0.4.15;


import "../contracts/upgradeable/Upgradeable.sol";


contract Target is Upgradeable {
    string public stringState;
    uint256 public intState;

    function setStringState(string value) public {
        stringState = value;
    }

    function setIntState(uint256 value) public {
        intState = value;
    }
}
