var Target = artifacts.require("./contracts/Target.sol");
var TargetV2 = artifacts.require("./contracts/TargetV2.sol");
var ErrorTarget = artifacts.require("./contracts/ErrorTarget.sol");
var StateErrorTarget = artifacts.require("./contracts/StateErrorTarget.sol");
var NotVerifyingTarget = artifacts.require("./contracts/NotVerifyingTarget.sol");
var Dispatcher = artifacts.require("./contracts/upgradeable/Dispatcher.sol");

module.exports = function(deployer) {
  deployer.deploy(TargetV2);
  deployer.deploy(ErrorTarget);
  deployer.deploy(StateErrorTarget);
  deployer.deploy(NotVerifyingTarget);
  deployer.deploy(Target)
    .then(() => deployer.deploy(Dispatcher, Target.address));
};
