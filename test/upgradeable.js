var Dispatcher = artifacts.require("./upgradeable/Dispatcher.sol");
var Target = artifacts.require("./contracts/Target.sol");
var TargetV2 = artifacts.require("./contracts/TargetV2.sol");
var ErrorTarget = artifacts.require("./contracts/ErrorTarget.sol");

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

  it("breaks your contract if you mix Upgradeable in wrong order", async () => {
    var dispatcher = await Dispatcher.deployed();
    var dispatcherAsTarget = Target.at(dispatcher.address);
    var errorTarget = await ErrorTarget.deployed();
    var dispatcherAsError = ErrorTarget.at(dispatcher.address);

    await dispatcherAsTarget.setStringState("this is test state");
    await expectThrow(dispatcherAsTarget.upgrade(errorTarget.address));
  });

  it("should let you come back to stable version", async () => {
    var target = await Target.deployed();
    var dispatcher = await Dispatcher.deployed();
    var dispatcherAsTarget = Target.at(dispatcher.address);
    var dispatcherAsError = ErrorTarget.at(dispatcher.address);

    await dispatcherAsError.upgrade(target.address);
    assert.equal((await dispatcherAsTarget.stringState.call()), "this is test state");
  });
});
