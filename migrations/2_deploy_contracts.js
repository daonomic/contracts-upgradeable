var Target = artifacts.require("./contracts/Target.sol");
var TargetV2 = artifacts.require("./contracts/TargetV2.sol");
var ErrorTarget = artifacts.require("./contracts/ErrorTarget.sol");
var Dispatcher = artifacts.require("./contracts/upgradeable/Dispatcher.sol");

module.exports = function(deployer) {
  deployer.deploy(TargetV2);
  deployer.deploy(ErrorTarget);
  deployer.deploy(Target)
    .then(() => deployer.deploy(Dispatcher, Target.address));
};
