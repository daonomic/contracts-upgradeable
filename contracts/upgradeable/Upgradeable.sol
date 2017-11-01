pragma solidity 0.4.15;


contract Upgradeable {
    address public target;
    event EventUpgrade(address target, address admin);

    modifier onlyAdmin() {
        checkAdmin();
        _;
    }

    function checkAdmin() internal;

    function upgrade(address _target) onlyAdmin public {
        target = _target;
        bytes4 targetCall = bytes4(keccak256("target()"));
        address testTarget;
        assembly {
            mstore(0x0, targetCall)
            let retval := delegatecall(gas, _target, 0x0, 4, 0x0, 32)
            testTarget := mload(0x0)
        }
        EventUpgrade(_target, msg.sender);
        assert(testTarget == _target);
        assertCorrectUpgrade();
    }

    function assertCorrectUpgrade() internal {

    }
}
