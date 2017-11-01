## Upgradeable contracts

It does what it says: you can have upgradeable contracts for reasonable price (about 1100 gas per call. it depends on returndatasize and returndatasize). Dispatcher uses new returndatasize and returndatacopy opcodes. So it won't work in pre-byzantium network.

### Disclaimer

This small library has not been heavily tested. Use it on your own risk.

### Basic Usage

1. Deploy target contract (You can use Upgradeable as base contract, it has some useful functions)
2. Deploy Dispatcher contract with address of the target as constructor argument.

### Writing compatible contracts

- The first storage slot in the contract will be used to store the address of the target contract
- Additionally, when you upgrade a contract that has already stored data on the blockchain, you will need to be sure not to change the organization of your contract's storage. You can safely add new storage variables, but do not delete or re-order existing ones. It may also be risky to change the version of the Solidity compiler used, as there is no guarantee the storage layout will remain the same

### Upgradeable overview

- Upgradeable has some checks to ensure next version is compatible with previous.
- See "[Upgradeable](contracts/upgradeable/Upgradeable.sol).verifyTargetState". It uses delegatecall to check if next contract version stores "target" storage variable in the same slot
- Also, you'd better implement your own version of "verifyState" function. It can check if other storage variables are in the same slots. See "test/contracts/Target.sol" for example