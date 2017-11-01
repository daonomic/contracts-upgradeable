pragma solidity ^0.4.15;


import "./TargetCommon.sol";
import "../../contracts/upgradeable/Upgradeable.sol";


contract ErrorTarget is TargetCommon, Upgradeable {
    function checkAdmin() internal {

    }
}
