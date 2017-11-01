var Dispatcher = artifacts.require("./upgradeable/Dispatcher.sol");
var Target = artifacts.require("./contracts/Target.sol");
var TargetV2 = artifacts.require("./contracts/TargetV2.sol");
var ErrorTarget = artifacts.require("./contracts/ErrorTarget.sol");
var StateErrorTarget = artifacts.require("./contracts/StateErrorTarget.sol");
var NotVerifyingTarget = artifacts.require("./contracts/NotVerifyingTarget.sol");

const expectThrow = require('./helpers/expectThrow.js')

contract('Upgradeable', function(accounts) {

  it("should let upgrade to v2", async () => {
    var target = await Target.deployed();
    var targetV2 = await TargetV2.deployed();
    var dispatcher = await Dispatcher.deployed();
    var dispatcherAsTarget = Target.at(dispatcher.address);
    var dispatcherAsTargetV2 = TargetV2.at(dispatcher.address);

    await dispatcherAsTarget.upgrade(targetV2.address, {from: accounts[2]})
    await dispatcherAsTargetV2.increaseIntState();
    await dispatcherAsTargetV2.setAdmin(accounts[1]);
    assert.equal(await dispatcherAsTargetV2.intState.call(), 1);
  });

  it("should not let upgrade if checkAdmin fails", async () => {
    var target = await Target.deployed();
    var dispatcher = await Dispatcher.deployed();
    var dispatcherAsTargetV2 = TargetV2.at(dispatcher.address);

    await expectThrow(dispatcherAsTargetV2.upgrade(target.address));
  });

  it("should let upgrade if checkAdmin succeeds", async () => {
    var target = await Target.deployed();
    var dispatcher = await Dispatcher.deployed();
    var dispatcherAsTargetV2 = TargetV2.at(dispatcher.address);

    await dispatcherAsTargetV2.upgrade(target.address, {from: accounts[1]})
  });

  it("should not let upgrade if target can't be verified", async () => {
    var dispatcher = await Dispatcher.deployed();
    var dispatcherAsTarget = Target.at(dispatcher.address);
    var errorTarget = await ErrorTarget.deployed();

    await expectThrow(dispatcherAsTarget.upgrade(errorTarget.address));
  });

  it("should not not let upgrade if intState can't be verified", async () => {
    var dispatcher = await Dispatcher.deployed();
    var dispatcherAsTarget = Target.at(dispatcher.address);
    var stateErrorTarget = await StateErrorTarget.deployed();

    await expectThrow(dispatcherAsTarget.upgrade(stateErrorTarget.address));
  });

  it("but it'll let upgrade if no check present", async () => {
    var dispatcher = await Dispatcher.deployed();
    var dispatcherAsTarget = Target.at(dispatcher.address);
    var stateErrorTarget = await StateErrorTarget.deployed();
    var notVerifyingTarget = await NotVerifyingTarget.deployed();

    await dispatcherAsTarget.setStringState("test state");
    await dispatcherAsTarget.upgrade(notVerifyingTarget.address);
    await dispatcherAsTarget.upgrade(stateErrorTarget.address);
    assert.notEqual(await dispatcherAsTarget.stringState.call(), "test state");

    await dispatcherAsTarget.upgrade(notVerifyingTarget.address);
    assert.equal(await dispatcherAsTarget.stringState.call(), "test state");
  });
});
