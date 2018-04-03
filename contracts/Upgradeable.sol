pragma solidity ^0.4.21;


contract Upgradeable {
    address public target;
    event EventUpgrade(address target, address admin);

    modifier onlyAdmin() {
        checkAdmin();
        _;
    }

    function checkAdmin() internal;

    function upgrade(address _target) onlyAdmin public {
        verifyTargetState(_target);
        verifyState(_target);
        target = _target;
        emit EventUpgrade(_target, msg.sender);
    }

    function verifyTargetState(address testTarget) private {
        require(address(delegateGet(testTarget, "target()")) == target);
    }

    function verifyState(address testTarget) internal {

    }

    function delegateGet(address testTarget, string signature) internal returns (bytes32 result) {
        bytes4 targetCall = bytes4(keccak256(signature));
        assembly {
            let free := mload(0x40)
            mstore(free, targetCall)
            let retVal := delegatecall(gas, testTarget, free, 4, free, 32)
            result := mload(free)
        }
    }
}
