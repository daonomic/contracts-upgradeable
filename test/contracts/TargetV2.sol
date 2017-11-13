pragma solidity ^0.4.15;


import "./TargetCommon.sol";
import "../../contracts/Upgradeable.sol";


contract TargetV2 is Upgradeable, TargetCommon {
    address public admin;

    function setAdmin(address _admin) public {
        admin = _admin;
    }

    function checkAdmin() internal {
        require(msg.sender == admin);
    }

    function increaseIntState() public {
        intState = intState + 1;
    }

    function verifyState(address testTarget) internal {
        require(uint256(delegateGet(testTarget, "intState()")) == intState);
    }
}
