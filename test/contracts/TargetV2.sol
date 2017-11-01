pragma solidity 0.4.15;


import "./TargetCommon.sol";
import "../../contracts/upgradeable/Upgradeable.sol";


contract TargetV2 is Upgradeable, TargetCommon {
    string public stringState;
    uint256 public intState;
    address public admin;

    function setAdmin(address _admin) public {
        admin = _admin;
    }

    function checkAdmin() internal {
        require(msg.sender == admin);
    }

    function setStringState(string value) public {
        stringState = value;
    }

    function setIntState(uint256 value) public {
        intState = value;
    }

    function increaseIntState() public {
        intState = intState + 1;
    }
}
