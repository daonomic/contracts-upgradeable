pragma solidity 0.4.15;


contract TargetCommon {
    string public stringState;
    uint256 public intState;

    function setStringState(string value) public {
        stringState = value;
    }

    function setIntState(uint256 value) public {
        intState = value;
    }
}
