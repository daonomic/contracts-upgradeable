pragma solidity ^0.4.15;


import "./TargetCommon.sol";
import "../../contracts/Upgradeable.sol";


contract Target is Upgradeable, TargetCommon {
    function checkAdmin() internal {

    }

    function verifyState(address testTarget) internal {
        require(uint256(delegateGet(testTarget, "intState()")) == intState);
    }
}
