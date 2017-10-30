var Dispatcher = artifacts.require("./upgradeable/Dispatcher.sol");
var Target = artifacts.require("./Target.sol");

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

function randomAlphanumeric(length) {
    return randomString(length, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
}

var target;
var dispatcher;
var dispatcherAsTarget;
var size = Math.floor(Math.random() * 100);
var state = randomAlphanumeric(size);

contract('Dispatcher', function(accounts) {

  it("should dispatch requests", async () => {
    target = await Target.new();
    dispatcher = await Dispatcher.new(target.address);
    dispatcherAsTarget = Target.at(dispatcher.address);

    await dispatcherAsTarget.setStringState(state)
    assert.equal(await dispatcherAsTarget.stringState.call(), state);
  });

  it("should use storage from Dispatcher, not from target", async () => {
    var size2 = Math.floor(Math.random() * 100);
    var state2 = randomAlphanumeric(size2);

    assert.equal(await target.stringState.call(), "");
    await target.setStringState(state2)
    assert.equal(await target.stringState.call(), state2);
    assert.equal(await dispatcherAsTarget.stringState.call(), state);
  });

  it("should consume not more than 1100 gas", async () => {
    var testValue = Math.floor(Math.random() * 1000);

    var dispatchedGas = (await dispatcherAsTarget.setIntState(testValue)).receipt.gasUsed;
    var directGas = (await target.setIntState(testValue)).receipt.gasUsed;

    console.log("gasUsage: direct=" + directGas + " dispatched=" + dispatchedGas + " diff=" + (dispatchedGas - directGas) + " (" + 100 * (dispatchedGas - directGas) / directGas + "%)");
  });
});
